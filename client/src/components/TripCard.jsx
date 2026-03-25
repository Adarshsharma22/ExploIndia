// TripCard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toggleLike, addComment } from '../services/authService';
import TripDetailModal from '../pages/TripDetailModal';
import Comment from '../pages/Comment';

const TripCard = ({ 
  post, 
  favoriteTrips = [], 
  onToggleFavorite, 
  onEdit, 
  onDelete,
  showActions = false 
}) => {
  const { user } = useAuth();

  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(user?._id));
  const [comments, setComments] = useState(post.comments || []);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [views, setViews] = useState(post.views || 0);
  const [activeMenu, setActiveMenu] = useState(null);

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

  return (
    <>
      <article className="group relative w-full max-w-2xl mx-auto overflow-hidden rounded-[2rem] bg-white/70 dark:bg-slate-900/80 border border-white/50 dark:border-slate-700/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 mb-8 md:mb-12 hover:-translate-y-1.5 ring-1 ring-inset ring-white/20">
        
        {/* Top Section: Author Info */}
        <div className="flex items-center p-4 md:p-6 gap-4">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-tr from-ei_teal to-ei_orange rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img
              src={post.user?.profilePic || '/img/avtar.png'}
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover ring-2 ring-white dark:ring-slate-800 shadow-md transition-transform duration-500 group-hover:scale-105"
              alt={post.user?.username}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg md:text-xl truncate tracking-tight">
              {post.user?.username || 'Anonymous User'}
            </h3>
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="text-ei_orange font-bold uppercase tracking-wider">{post.location || 'India'}</span>
              <span className="opacity-30">•</span>
              <span>{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
            </div>
          </div>
          {showActions && (
              <div className="flex items-center gap-2">

                {/* ⭐ Favorite */}
                <button
                  onClick={() => onToggleFavorite?.(post._id)}
                  className={`p-2 rounded-full transition ${
                    favoriteTrips?.includes(post._id)
                      ? "bg-ei_orange text-white"
                      : "text-slate-400 hover:text-ei_orange"
                  }`}
                >
                  {favoriteTrips?.includes(post._id) ? "⭐" : "☆"}
                </button>

                {/* ⋮ Menu */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === post._id ? null : post._id);
                    }}
                    className="p-2 text-xl hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
                  >
                    ⋮
                  </button>

                  {activeMenu === post._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-lg border z-50">
                      <button
                        onClick={() => onEdit?.(post._id)}
                        className="block w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => onDelete?.(post._id)}
                        className="block w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900 text-red-500 text-sm"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
        </div>

        {/* Hero Image Section */}
        {post.images?.length > 0 && (
          <div 
            onClick={() => setShowDetailModal(true)}
            className="relative h-72 md:h-96 mx-4 md:mx-6 overflow-hidden rounded-[1.5rem] cursor-pointer shadow-lg group/img"
          >
            <img 
              src={post.images[0]} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/img:scale-110" 
              alt="trip" 
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover/img:opacity-100 transition-opacity" />

            {/* Float Badge */}
            <div className="absolute top-4 right-4 flex gap-2">
              {post.images.length > 1 && (
                <div className="bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-xl">
                  +{post.images.length - 1} Photos
                </div>
              )}
            </div>
            
            <div className="absolute bottom-4 left-4">
               <h4 className="text-white font-black text-xl md:text-3xl drop-shadow-md">
                #{post.title}
              </h4>
            </div>
          </div>
        )}

        {/* Content & Actions Section */}
        <div className="p-5 md:p-8">
          <p className="text-[15px] md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed line-clamp-3 mb-8 font-medium italic">
            "{post.description}"
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-4 md:gap-8">
              {/* Like Button */}
              <button 
                onClick={handleLike}
                className={`group/like flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all active:scale-90 ${
                  isLiked 
                  ? 'bg-red-50 text-red-500 dark:bg-red-500/10' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className={`text-2xl transition-transform duration-300 group-hover/like:scale-120 ${isLiked ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : ''}`}>
                  {isLiked ? '❤️' : '🤍'}
                </span>
                <span className="font-black text-base md:text-lg">{likesCount}</span>
              </button>

              {/* Comment Button */}
              <button 
                onClick={() => setShowCommentModal(true)}
                className="group/comment flex items-center gap-2.5 px-4 py-2 rounded-2xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all active:scale-90"
              >
                <span className="text-2xl transition-transform group-hover/comment:rotate-12">💬</span>
                <span className="font-black text-base md:text-lg">{comments.length}</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 text-[11px] font-bold uppercase tracking-tighter">
              <span className="w-1.5 h-1.5 rounded-full bg-ei_teal animate-pulse"></span>
              {views} Views
            </div>
          </div>
        </div>
      </article>

      {/* Modals remain the same */}
      {showCommentModal && (
        <Comment
          comments={comments}
          addComment={async (text) => {
            const newCommentData = await addComment(post._id, text);
            setComments([...comments, newCommentData]);
          }}
          onClose={() => setShowCommentModal(false)}
        />
      )}

      {showDetailModal && (
        <TripDetailModal post={post} onClose={() => setShowDetailModal(false)} />
      )}
    </>
  );
};

export default TripCard;