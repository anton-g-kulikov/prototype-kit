"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const generateId = () => Math.random().toString(36).substr(2, 9);

export type Comment = {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  marker_id: string;
  resolved?: boolean;
};

export type MarkerData = {
  id: string;
  title: string;
  description: string;
};

type CommentContextType = {
  activeMarker: MarkerData | null;
  setActiveMarker: (marker: MarkerData | null) => void;
  comments: Record<string, Comment[]>;
  addComment: (markerId: string, text: string) => void;
  resolveComment: (markerId: string, commentId: string) => void;
  unresolveComment: (markerId: string, commentId: string) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  isLoading: boolean;
};

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const [activeMarker, setActiveMarker] = useState<MarkerData | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load from Supabase
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching comments from Supabase:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // Fallback to localStorage
        const localComments = localStorage.getItem('prototype_comments');
        if (localComments) {
          try {
            setComments(JSON.parse(localComments));
          } catch (e) {
            console.error("Error parsing local comments:", e);
          }
        }
      } else if (data) {
        const grouped: Record<string, Comment[]> = {};
        
        data.forEach((curr: any) => {
          const mId = curr.marker_id || curr.markerId;
          if (!mId) return;
          
          if (!grouped[mId]) grouped[mId] = [];
          
          grouped[mId].push({
            id: curr.id,
            text: curr.text,
            author: curr.author || 'Viewer',
            timestamp: new Date(curr.created_at || curr.timestamp || Date.now()).getTime(),
            marker_id: mId,
            resolved: !!curr.resolved
          });
        });
        
        setComments(grouped);
        // Sync to localStorage as backup
        localStorage.setItem('prototype_comments', JSON.stringify(grouped));
      }
      setIsLoading(false);
    };

    fetchComments();

    const channel = supabase
      .channel('comments-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newComment = payload.new as any;
            const mId = newComment.marker_id || newComment.markerId;
            if (!mId) return;

            setComments(prev => {
              const currentMarkerComments = prev[mId] || [];
              if (currentMarkerComments.some(c => c.id === newComment.id)) return prev;

              return {
                ...prev,
                [mId]: [
                  ...currentMarkerComments,
                  {
                    id: newComment.id,
                    text: newComment.text,
                    author: newComment.author || 'Viewer',
                    timestamp: new Date(newComment.created_at || Date.now()).getTime(),
                    marker_id: mId,
                    resolved: !!newComment.resolved
                  }
                ]
              };
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedComment = payload.new as any;
            const mId = updatedComment.marker_id || updatedComment.markerId;
            if (!mId) return;

            setComments(prev => {
              const currentMarkerComments = prev[mId] || [];
              const updatedList = currentMarkerComments.map(c => {
                if (c.id === updatedComment.id) {
                  return {
                    ...c,
                    text: updatedComment.text,
                    author: updatedComment.author || c.author,
                    resolved: !!updatedComment.resolved
                  };
                }
                return c;
              });
              return {
                ...prev,
                [mId]: updatedList
              };
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addComment = async (markerId: string, text: string) => {
    const tempId = generateId();
    const optimisticComment: Comment = {
      id: tempId,
      text,
      author: 'You (sending...)',
      timestamp: Date.now(),
      marker_id: markerId,
      resolved: false
    };

    setComments(prev => ({
      ...prev,
      [markerId]: [...(prev[markerId] || []), optimisticComment]
    }));

    const { error } = await supabase
      .from('comments')
      .insert([
        { marker_id: markerId, text: text, author: 'Viewer', resolved: false }
      ]);

    if (error) {
      console.error("Error adding comment to Supabase, keeping local version:", error);
      // We keep the optimistic comment in state, and update localStorage
      setComments(prev => {
        const updated = {
          ...prev,
          [markerId]: prev[markerId].map(c => 
            c.id === tempId ? { ...c, author: 'Viewer', resolved: false } : c
          )
        };
        localStorage.setItem('prototype_comments', JSON.stringify(updated));
        return updated;
      });
    } else {
      // Update local storage on success too
      setComments(prev => {
        const updated = {
          ...prev,
          [markerId]: prev[markerId].map(c => 
            c.id === tempId ? { ...c, author: 'Viewer', resolved: false } : c
          )
        };
        localStorage.setItem('prototype_comments', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const resolveComment = async (markerId: string, commentId: string) => {
    // 1. Optimistic update
    setComments(prev => {
      const updated = {
        ...prev,
        [markerId]: (prev[markerId] || []).map(c => 
          c.id === commentId ? { ...c, resolved: true } : c
        )
      };
      localStorage.setItem('prototype_comments', JSON.stringify(updated));
      return updated;
    });

    // 2. Supabase update
    const { error } = await supabase
      .from('comments')
      .update({ resolved: true })
      .eq('id', commentId);

    if (error) {
      console.error("Error updating comment in Supabase, kept local version:", error);
    }
  };

  const unresolveComment = async (markerId: string, commentId: string) => {
    // 1. Optimistic update
    setComments(prev => {
      const updated = {
        ...prev,
        [markerId]: (prev[markerId] || []).map(c => 
          c.id === commentId ? { ...c, resolved: false } : c
        )
      };
      localStorage.setItem('prototype_comments', JSON.stringify(updated));
      return updated;
    });

    // 2. Supabase update
    const { error } = await supabase
      .from('comments')
      .update({ resolved: false })
      .eq('id', commentId);

    if (error) {
      console.error("Error updating comment in Supabase, kept local version:", error);
    }
  };

  const handleSetMarker = (marker: MarkerData | null) => {
    setActiveMarker(marker);
    if (marker) setIsPanelOpen(true);
  };

  return (
    <CommentContext.Provider value={{ 
      activeMarker, 
      setActiveMarker: handleSetMarker, 
      comments, 
      addComment,
      resolveComment,
      unresolveComment,
      isPanelOpen,
      setIsPanelOpen,
      isLoading
    }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentContext);
  if (!context) throw new Error("useComments must be used within CommentProvider");
  return context;
}
