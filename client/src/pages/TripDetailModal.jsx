import React from "react";

const TripDetailModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-800 w-10 h-10 rounded-full font-bold"
        >
          ✕
        </button>

        {/* Images */}
        {post.images?.length > 0 && (
          <img
            src={post.images[0]}
            alt="Trip"
            className="w-full h-80 object-cover rounded-t-3xl"
          />
        )}

        <div className="p-6">
          <h2 className="text-3xl font-black mb-2">{post.title}</h2>
          <p className="text-slate-500 text-sm mb-4">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {post.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripDetailModal;