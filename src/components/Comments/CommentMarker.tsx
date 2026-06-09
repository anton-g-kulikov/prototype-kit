"use client";

import React from 'react';
import { useComments, MarkerData } from './CommentContext';

interface CommentMarkerProps extends MarkerData {
  className?: string;
}

export function CommentMarker({ id, title, description, className = "" }: CommentMarkerProps) {
  const { setActiveMarker, activeMarker, comments } = useComments();
  
  const isActive = activeMarker?.id === id;

  const markerComments = comments[id] || [];
  const activeCount = markerComments.filter(c => !c.resolved).length;
  const resolvedCount = markerComments.filter(c => c.resolved).length;
  const isResolved = resolvedCount > 0 && activeCount === 0;

  const displayText = activeCount > 0 
    ? activeCount 
    : (isResolved ? "✓" : "i");

  let colorClass = "";
  if (isActive) {
    colorClass = "bg-black text-white border-black scale-110 shadow-wireframe-sm";
  } else if (isResolved) {
    colorClass = "bg-zinc-100 text-zinc-400 border-zinc-300 border-dashed hover:border-solid hover:bg-zinc-200 hover:text-zinc-600";
  } else if (activeCount > 0) {
    colorClass = "bg-white text-black border-black font-black border-3 shadow-wireframe-sm";
  } else {
    colorClass = "bg-white text-black border-black shadow-wireframe-sm opacity-85 hover:opacity-100";
  }

  const textStyleClass = activeCount > 0 || isResolved ? "not-italic" : "italic";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActiveMarker({ id, title, description });
      }}
      className={`
        inline-flex items-center justify-center w-6 h-6 rounded-full 
        border-2 font-black text-[10px]
        transition-all transform hover:scale-110 active:scale-95 z-10
        ${colorClass}
        ${textStyleClass}
        ${className}
      `}
      title={`Comment on ${title}`}
    >
      {displayText}
    </button>
  );
}
