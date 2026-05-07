"use client";

import React from 'react';
import { useComments, MarkerData } from './CommentContext';

interface CommentMarkerProps extends MarkerData {
  className?: string;
}

export function CommentMarker({ id, title, description, className = "" }: CommentMarkerProps) {
  const { setActiveMarker, activeMarker } = useComments();
  
  const isActive = activeMarker?.id === id;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActiveMarker({ id, title, description });
      }}
      className={`
        inline-flex items-center justify-center w-6 h-6 rounded-full 
        border-2 border-black font-black text-[10px] italic
        transition-all transform hover:scale-110 active:scale-95 z-10
        ${isActive ? 'bg-black text-white scale-110 shadow-wireframe-sm' : 'bg-white text-black shadow-wireframe-sm'}
        ${className}
      `}
      title={`Comment on ${title}`}
    >
      i
    </button>
  );
}
