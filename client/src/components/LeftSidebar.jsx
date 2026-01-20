import React from 'react';

const LeftSidebar = () => {
  return (
    <aside className="lg:col-span-3 hidden lg:block">
      <div className="card-shadow rounded-lg bg-white dark:bg-slate-700 p-5 glass">
        <div className="flex items-center gap-4">
          <img
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            src="img/CGPTHeader.png"
            alt="profile"
          />
          <div>
            <h3 className="text-lg font-semibold">Adarsh Sharma</h3>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Traveller Photographer
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-slate-600 dark:text-slate-200">
            Explorer of India's landscapes. Loves mountains, food & road trips.
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <a
            className="flex-1 text-center py-2 rounded bg-ei_teal hover:bg-green-400 text-white font-medium hover:opacity-95"
            href="#"
          >
            Posts
          </a>
          <a
            className="flex-1 text-center py-2 rounded border border-slate-200 hover:bg-slate-50 dark:hover:text-slate-800"
            href="#"
          >
            Friends
          </a>
        </div>

        <div className="mt-4 border-t pt-3 text-sm text-slate-700 dark:text-white">
          <div className="flex justify-between">
            <span>Followers</span>
            <strong>1.2k</strong>
          </div>
          <div className="flex justify-between mt-2">
            <span>Following</span>
            <strong>312</strong>
          </div>
        </div>
      </div>

      {/* quick links */}
      <div className="mt-6 card-shadow rounded-lg bg-white dark:bg-slate-700 p-4">
        <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
        <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-200">
          <li>
            <a href="#" className="flex items-center gap-2 hover:text-ei_teal">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  d="M3 7h18M3 12h18M3 17h18"
                />
              </svg>{' '}
              Groups
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 hover:text-ei_teal">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>{' '}
              Events
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 hover:text-ei_teal">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth="2" d="M12 8v8M8 12h8" />
              </svg>{' '}
              Create Post
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar;