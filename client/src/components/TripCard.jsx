import React from 'react';

const TripCard = ({ post }) => {
  if (!post) {
    return (
      <article className="rounded-xl bg-white/90 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 backdrop-blur-sm p-4 shadow mb-4">
        <p className="text-slate-500">Loading trip...</p>
      </article>
    );
  }

  const user = post.user || {}; // default to empty object
  const profilePic = user.profilePic || 'img/avtar.png'; // fallback

  return (
    <article className="group relative overflow-hidden rounded-[2rem] bg-white/40 dark:bg-slate-900/40 border border-white/40 dark:border-slate-700/40 backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 mb-6">
  
  {/* Subtle glass reflection highlight */}
  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-slate-500/30"></div>

  <div className="flex items-start gap-4">
    {/* AVATAR SECTION */}
    <div className="relative">
      <img
        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/60 dark:ring-slate-800/60 shadow-lg group-hover:ring-ei_teal transition-all duration-300"
        src={profilePic}
        alt={user.username || 'User'}
      />
    </div>

    <div className="flex-1 min-w-0">
      {/* TOP HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight hover:text-ei_teal transition-colors cursor-pointer leading-tight">
            {user.username || 'Anonymous User'}
          </h3>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mt-0.5">
            <span className="text-ei_orange/80">{post.location || 'India'}</span>
            <span>•</span>
            <span>
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                : 'Recent'}
            </span>
          </div>
        </div>
        
        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-400 transition-all">
          <span className="text-xl font-bold -mt-2">...</span>
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="mt-4">
        <p className="text-[15px] text-slate-700 dark:text-slate-200 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
          <span className="font-black text-ei_teal mr-1.5 italic">#{post.title?.replace(/\s+/g, '') || 'TravelStory'}</span>
          {post.description || post.content || 'No description available'}
        </p>
      </div>

      {/* DYNAMIC GALLERY */}
      {post.images?.length > 0 && (
        <div className={`mt-5 grid gap-2.5 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {post.images.slice(0, 3).map((img, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-[1.5rem] border border-white/20 dark:border-slate-700/20 shadow-sm ${
                post.images.length === 3 && index === 0 ? 'row-span-2 h-full' : 'h-36'
              }`}
            >
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 cursor-zoom-in"
                src={img}
                alt={`Trip image ${index + 1}`}
              />
              {index === 2 && post.images.length > 3 && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] flex flex-col items-center justify-center text-white font-black rounded-[1.5rem]">
                  <span className="text-xl">+{post.images.length - 3}</span>
                  <span className="text-[8px] uppercase tracking-widest">Photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* INTERACTION BAR */}
      <div className="mt-6 pt-5 border-t border-slate-200/30 dark:border-slate-700/30 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 dark:bg-slate-800/30 hover:bg-ei_orange/10 text-slate-600 dark:text-slate-400 hover:text-ei_orange transition-all duration-300 group/btn">
            <span className="text-lg group-hover/btn:scale-125 transition-transform">❤️</span>
            <span className="text-xs font-black">{post.likes?.length || 0}</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 dark:bg-slate-800/30 hover:bg-ei_teal/10 text-slate-600 dark:text-slate-400 hover:text-ei_teal transition-all duration-300 group/btn">
            <span className="text-lg group-hover/btn:scale-125 transition-transform">💬</span>
            <span className="text-xs font-black">{post.comments?.length || 0}</span>
          </button>

          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 dark:bg-slate-800/30 hover:bg-ei_blue/10 text-slate-600 dark:text-slate-400 hover:text-ei_blue transition-all duration-300">
            <span className="text-lg">🔗</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/50 dark:bg-slate-800/50 border border-white/20">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400">{post.views || 0}</span>
        </div>
      </div>
    </div>
  </div>
</article>
  );
};

export default TripCard;