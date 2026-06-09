"use client";
 
import React, { useState } from 'react';
import { useComments } from './CommentContext';
 
export function CommentPanel() {
  const { 
    activeMarker, 
    comments, 
    addComment, 
    resolveComment, 
    unresolveComment, 
    isPanelOpen, 
    setIsPanelOpen, 
    isLoading 
  } = useComments();
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState<'active' | 'resolved'>('active');
 
  if (!isPanelOpen || !activeMarker) return null;
 
  const markerComments = comments[activeMarker.id] || [];
  const activeComments = markerComments.filter(c => !c.resolved);
  const resolvedComments = markerComments.filter(c => c.resolved);
  const displayedComments = activeTab === 'active' ? activeComments : resolvedComments;
 
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
            <div className="flex border-2 border-black divide-x-2 divide-black">
              <button
                type="button"
                onClick={() => setActiveTab('active')}
                className={`flex-1 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                  activeTab === 'active' ? 'bg-black text-white' : 'bg-white text-black hover:bg-zinc-100'
                }`}
              >
                Active ({activeComments.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('resolved')}
                className={`flex-1 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                  activeTab === 'resolved' ? 'bg-black text-white' : 'bg-white text-black hover:bg-zinc-100'
                }`}
              >
                Resolved ({resolvedComments.length})
              </button>
            </div>
            
            {isLoading ? (
              <div className="py-8 text-center">
                <div className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Loading Feedback...</p>
              </div>
            ) : displayedComments.length === 0 ? (
              <p className="text-xs text-muted-foreground py-8 uppercase font-bold tracking-widest text-center border border-dashed border-zinc-350 p-4">
                {activeTab === 'active' 
                  ? "No active comments. All caught up!" 
                  : "No resolved comments."}
              </p>
            ) : (
              displayedComments.map((comment) => (
                <div key={comment.id} className="wireframe-card p-3 space-y-2 animate-slide-in flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase">{comment.author}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">
                        {new Date(comment.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mt-1">{comment.text}</p>
                  </div>
                  <div className="flex justify-end pt-1">
                    {comment.resolved ? (
                      <button
                        type="button"
                        onClick={() => unresolveComment(activeMarker.id, comment.id)}
                        className="wireframe-button text-[10px] py-1 px-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors uppercase font-black"
                      >
                        Reopen
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => resolveComment(activeMarker.id, comment.id)}
                        className="wireframe-button text-[10px] py-1 px-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors uppercase font-black"
                      >
                        Resolve
                      </button>
                    )}
                  </div>
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
