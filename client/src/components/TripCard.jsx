import React from 'react';

const TripCard = ({ post }) => {
  // Safety check - if there's no post data at all
  if (!post) {
    return (
      <article className="rounded-xl bg-white/90 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 backdrop-blur-sm p-4 shadow mb-4">
        <p className="text-slate-500">Loading trip...</p>
      </article>
    );
  }

  const user = post.user || {}; // default to empty object
  const profilePic = user.profilePic || 'img/Sagar.jpg'; // fallback

  return (
    <article className="rounded-xl bg-white/90 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 backdrop-blur-sm p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition mb-4">
      <div className="flex items-start gap-4">
        <img
          className="w-11 h-11 rounded-full object-cover ring-2 ring-ei_teal/20"
          src={profilePic}
          alt={user.username || 'User'}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {user.username || 'Anonymous User'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                {post.location || 'Unknown location'} •{' '}
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : 'Date unknown'}
              </p>
              <p className="mt-3 text-slate-700 dark:text-slate-200 leading-relaxed">
                {post.description || post.content || 'No description available'}
              </p>
            </div>
            <button className="text-slate-400 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100 transition">
              ⋮
            </button>
          </div>

          {/* Main content - choose description or content based on what you have */}
          <p className="mt-3 text-slate-700 dark:text-slate-200 leading-relaxed">
            {post.content || 'No additional content'}
          </p>

          {/* Gallery */}
          {post.images?.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {post.images.map((img, index) => (
                <img
                  key={index}
                  className="w-full h-24 rounded-lg object-cover hover:scale-105 transition"
                  src={img}
                  alt={`Trip image ${index + 1}`}
                  loading="lazy" // performance improvement
                />
              ))}
            </div>
          )}

          {/* Interactions */}
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-4">
              <button className="like-btn inline-flex items-center gap-2 hover:text-ei_orange transition">
                ❤️ <span className="like-count">{post.likes?.length || 0}</span>
              </button>
              <button className="inline-flex items-center gap-2 hover:text-ei_orange transition">
                💬 {post.comments?.length || 0}
              </button>
              <button className="inline-flex items-center gap-2 hover:text-ei_orange transition">
                🔗 Share
              </button>
            </div>
            <span className="text-xs text-slate-400">{post.views || 0} views</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TripCard;