// src/pages/AboutUs.jsx

export default function AboutUs() {
  return (
    <>
      {/* HERO / INTRO */}
      <section className="relative py-20 overflow-hidden bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Our Mission is to{" "}
            <span className="bg-gradient-to-r from-ei_orange to-ei_teal bg-clip-text text-transparent">
              Connect Every Traveller
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            ExploIndia was born out of a simple passion: to showcase the hidden
            gems of our incredible country. We believe that the best travel
            advice comes from those who have actually walked the trails.
          </p>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-ei_teal/5 to-transparent pointer-events-none" />
      </section>

      {/* FEATURES */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl hover:-translate-y-2 transition-transform">
            <div className="w-14 h-14 rounded-lg bg-ei_orange/10 flex items-center justify-center mb-6">
              <i className="uil uil-users-alt text-3xl text-ei_orange"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Community First</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A platform built by travellers, for travellers. Real stories, not
              just advertisements.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl hover:-translate-y-2 transition-transform">
            <div className="w-14 h-14 rounded-lg bg-ei_teal/10 flex items-center justify-center mb-6">
              <i className="uil uil-scenery text-3xl text-ei_teal"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Hidden Gems</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Discovering and preserving the beauty of offbeat destinations
              across India.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl hover:-translate-y-2 transition-transform">
            <div className="w-14 h-14 rounded-lg bg-ei_blue/10 flex items-center justify-center mb-6">
              <i className="uil uil-shield-check text-3xl text-ei_blue"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Authenticity</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Verified tips and guides to ensure your safety and enjoyment on
              every journey.
            </p>
          </div>
        </div>

        {/* WHY EXPLOINDIA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              className="rounded-3xl shadow-2xl"
              src="https://images.unsplash.com/photo-1527333656061-ca7adf608ae1?q=80&w=1200&auto=format&fit=crop"
              alt="Indian Landscape"
            />

            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-700 p-6 rounded-2xl shadow-xl hidden md:block border border-slate-100 dark:border-slate-600">
              <p className="text-ei_teal font-bold text-4xl">10K+</p>
              <p className="text-sm font-medium">Active Explorers</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why ExploIndia?</h2>
            <p className="text-slate-600 dark:text-slate-300">
              India is a land of diverse cultures, terrains, and experiences.
              From the snow-capped Himalayas to the tropical backwaters of
              Kerala, there is so much to see.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              We realized that while there are many travel sites, none captured
              the <strong>soul of Indian travel</strong> through the eyes of
              local explorers.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-100 dark:bg-slate-800 py-12 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            © 2025 ExploIndia. Made with ❤️ for Indian Travellers.
          </p>
        </div>
      </footer>
    </>
  );
};



