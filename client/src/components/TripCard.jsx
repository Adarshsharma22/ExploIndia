import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toggleLike, addComment } from '../services/authService';
import TripDetailModal from '../pages/TripDetailModal'; // Ensure correct path

const TripCard = ({ post }) => {
  const { user } = useAuth();

  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(user?._id));
  const [comments, setComments] = useState(post.comments || []);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false); // Modal state
  const [newComment, setNewComment] = useState('');
  const [views, setViews] = useState(post.views || 0);

  useEffect(() => {
    setViews(prev => prev + 1);
  }, []);

  const handleLike = async () => {
    try {
      const res = await toggleLike(post._id);
      setLikesCount(res.likes);
      setIsLiked(res.liked);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const newCommentData = await addComment(post._id, newComment);
      setComments([...comments, newCommentData]);
      setNewComment('');
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  return (
    <>
      <article className="group relative overflow-hidden rounded-[2.5rem] bg-white/30 dark:bg-slate-900/40 border border-white/50 dark:border-slate-700/50 backdrop-blur-xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 mb-8 hover:-translate-y-1">
        
        <div className="flex items-start gap-4">
          {/* Avatar with Status Ring */}
          <div className="relative shrink-0">
            <div className="absolute -inset-1 bg-linear-to-tr from-ei_teal to-ei_orange rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img
              className="relative w-14 h-14 rounded-2xl object-cover ring-2 ring-white dark:ring-slate-800 shadow-md transition-transform duration-500 group-hover:scale-105"
              src={post.user?.profilePic || '/img/avtar.png'}
              alt={post.user?.username}
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xl tracking-tight leading-none mb-1.5">
                  {post.user?.username || 'Anonymous User'}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500/80">
                  <span className="text-ei_orange bg-ei_orange/10 px-2 py-0.5 rounded-md">{post.location || 'India'}</span>
                  <span className="opacity-30">•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mt-4">
              <p className="text-[16px] text-slate-700 dark:text-slate-200 leading-relaxed line-clamp-3">
                <span className="font-extrabold text-ei_teal mr-1">#{post.title}</span> 
                {post.description}
              </p>
            </div>

            {/* Gallery - Now with Click to Open */}
            {post.images?.length > 0 && (
              <div 
                onClick={() => setShowDetailModal(true)}
                className="mt-5 grid gap-3 grid-cols-2 cursor-pointer group/images"
              >
                {post.images.slice(0, 3).map((img, i) => (
                  <div key={i} className={`relative overflow-hidden rounded-3xl shadow-sm ${i === 0 && post.images.length > 2 ? 'row-span-2 h-full' : 'h-40'}`}>
                    <img 
                      src={img} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/images:scale-110" 
                      alt="trip" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/images:bg-black/10 transition-colors duration-500" />
                  </div>
                ))}
                {post.images.length > 3 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        +{post.images.length - 3} more
                    </div>
                )}
              </div>
            )}

            {/* INTERACTION BAR */}
            <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-8">
                {/* Like Button - Enhanced UI */}
                <button 
                  onClick={handleLike}
                  className={`group/like flex items-center gap-2.5 transition-all duration-300 transform active:scale-125 ${isLiked ? 'text-red-500' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <div className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-50 dark:bg-red-500/10' : 'bg-slate-100 dark:bg-slate-800/50 group-hover/like:bg-slate-200'}`}>
                    <span className="text-xl flex items-center justify-center">
                        {isLiked ? '❤️' : '🤍'}
                    </span>
                  </div>
                  <span className="font-black text-sm">{likesCount}</span>
                </button>

                {/* Comment Button */}
                <button 
                  onClick={() => setShowCommentModal(true)}
                  className="group/comment flex items-center gap-2.5 text-slate-400 hover:text-ei_teal transition-all"
                >
                  <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/50 group-hover/comment:bg-ei_teal/10">
                    <span className="text-xl">💬</span>
                  </div>
                  <span className="font-black text-sm">{comments.length}</span>
                </button>
              </div>

              {/* View Count */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-wider">
                <span className="animate-pulse text-ei_teal text-xs">●</span> {views} views
              </div>
            </div>
          </div>
        </div>

        {/* COMMENT MODAL - Styled with Glass */}
        {showCommentModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-60 p-4">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] w-full max-w-lg p-8 border border-white/20 shadow-2xl">
              <h3 className="font-black text-2xl mb-6 flex items-center gap-3">
                Comments <span className="text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-500">{comments.length}</span>
              </h3>

              <div className="max-h-72 overflow-y-auto space-y-5 mb-8 pr-2 custom-scrollbar">
                {comments.length === 0 ? (
                  <div className="text-center py-10 opacity-40">
                    <span className="text-4xl mb-2 block">💭</span>
                    <p className="font-medium">No comments yet</p>
                  </div>
                ) : (
                  comments.map((c, i) => (
                    <div key={i} className="flex gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 shrink-0" />
                      <div className="flex-1">
                        <p className="font-bold text-sm text-slate-900 dark:text-white">{c.user?.username || 'User'}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800/50 border-none px-5 py-4 rounded-3xl focus:ring-2 focus:ring-ei_teal transition-all outline-none"
                />
                <button 
                  onClick={handleAddComment}
                  className="bg-ei_teal hover:bg-ei_teal/90 text-white font-black px-6 py-4 rounded-3xl transition-all shadow-lg shadow-ei_teal/20"
                >
                  Post
                </button>
              </div>

              <button 
                onClick={() => setShowCommentModal(false)}
                className="mt-6 w-full py-2 text-slate-400 hover:text-slate-600 font-bold transition-all text-sm"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </article>

      {/* TRIP DETAIL MODAL */}
      {showDetailModal && (
        <TripDetailModal post={post} onClose={() => setShowDetailModal(false)} />
      )}
    </>
  );
};

export default TripCard;