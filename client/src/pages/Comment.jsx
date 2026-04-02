import React, { useState } from 'react';

const Comment = ({ comments, addComment, onClose }) => {
  const [newComment, setNewComment] = useState('');

  const handleAdd = () => {
    if (!newComment.trim()) return;
    addComment(newComment);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-300">
      
      {/* 🟢 Transparent Backdrop Layer (Handles clicking outside) */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      />

      {/* 🔥 Modal Card */}
      <div 
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
        className="relative bg-white dark:bg-slate-900 w-full max-w-xl md:max-w-lg 
                   rounded-t-[2.5rem] md:rounded-[2rem] flex flex-col 
                   max-h-[85vh] md:max-h-[70vh] shadow-2xl border-t md:border border-white/20 
                   animate-in slide-in-from-bottom duration-500 overflow-hidden"
      >
        
        {/* Mobile Handle Indicator */}
        <div className="w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mt-4 mb-2 md:hidden" />

        {/* 🔥 Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-none">Discussion</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              {comments.length} Thoughts shared
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
          >
            ✕
          </button>
        </div>

        {/* 🔥 Comments List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {comments.length === 0 ? (
            <div className="py-10 text-center flex flex-col items-center">
              <span className="text-4xl mb-3 opacity-30">💭</span>
              <p className="text-slate-400 text-sm font-medium italic">No stories shared yet...</p>
            </div>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="flex gap-4 group animate-in fade-in duration-500">
                {/* Avatar Initials */}
                <img
                  src={c.user?.profilePic || "/img/avtar.png"}
                  alt="user"
                  className="h-10 w-10 rounded-xl object-cover border border-white/40 dark:border-white/5"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                    {c.user?.fullName || c.user?.username || 'Traveler'}
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl rounded-tl-none inline-block max-w-full">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                      {c.text}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 🔥 Input & Controls */}
        <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-white/5">
          <div className="flex gap-2  items-center bg-white dark:bg-slate-800 p-1.5 pl-4 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-teal-400/50 transition-all">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-transparent border-none py-2 text-sm focus:ring-0 outline-none dark:text-white"
              placeholder="Join the conversation..."
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button
              onClick={handleAdd}
              disabled={!newComment.trim()}
              className="bg-teal-700 hover:bg-teal-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-95"
            >
              Post
            </button>
          </div>

          {/* 🔥 Bottom Dismiss Button */}
          <button
            onClick={onClose}
            className="mt-4 w-full text-center text-xs text-slate-400 hover:text-slate-600 font-bold uppercase tracking-[0.2em] transition-colors"
          >
            Dismiss
          </button>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}} />
    </div>
  );
};

export default Comment;