"use client";

import React, { useState } from 'react';
import { useComments } from './CommentContext';

export function CommentPanel() {
  const { activeMarker, comments, addComment, isPanelOpen, setIsPanelOpen, isLoading } = useComments();
  const [newComment, setNewComment] = useState("");

  if (!isPanelOpen || !activeMarker) return null;

  const markerComments = comments[activeMarker.id] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(activeMarker.id, newComment);
      setNewComment("");
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40 transition-opacity"
        onClick={() => setIsPanelOpen(false)}
      />
      
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l-4 border-black z-50 shadow-wireframe-left dark:shadow-wireframe-left-white flex flex-col animate-fade-in">
        <div className="p-6 border-b-2 border-black flex justify-between items-start">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter leading-none">
              {activeMarker.title}
            </h2>
            <p className="text-xs font-bold uppercase text-muted-foreground mt-2 tracking-widest">
              Reviewer Notes
            </p>
          </div>
          <button 
            onClick={() => setIsPanelOpen(false)}
            className="wireframe-button text-sm py-1 px-2"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="wireframe-card bg-muted/30 border-dashed">
            <p className="text-sm font-medium">
              &quot;{activeMarker.description}&quot;
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest border-b border-black pb-1">
              Feedback ({markerComments.length})
            </h3>
            
            {isLoading ? (
              <div className="py-8 text-center">
                <div className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Loading Feedback...</p>
              </div>
            ) : markerComments.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 uppercase font-bold tracking-widest">
                No comments yet. Be the first to leave feedback!
              </p>
            ) : (
              markerComments.map((comment) => (
                <div key={comment.id} className="wireframe-card p-3 space-y-2 animate-slide-in">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase">{comment.author}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {new Date(comment.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 border-t-2 border-black bg-white">
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type your feedback here..."
              className="wireframe-input text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black/5"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="wireframe-button w-full bg-black text-white uppercase text-sm tracking-widest py-3 disabled:opacity-50"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
