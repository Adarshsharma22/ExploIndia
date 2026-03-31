// src/pages/AboutUs.jsx
import React from 'react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-300 dark:bg-slate-950 transition-colors duration-500 selection:bg-ei_teal/30">
      
      {/* HERO SECTION: The Crystal Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ei_teal/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ei_orange/10 blur-[120px] rounded-full animate-pulse delay-700"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ei_teal">Our Journey</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-slate-900 dark:text-white">
            Connecting Every <br />
            <span className="bg-linear-to-r from-ei_orange via-ei_teal to-ei_blue bg-clip-text text-transparent">
              Indian Traveller
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium italic">
            ExploIndia is more than a platform; it's a movement to showcase the hidden
            gems of our incredible country through the eyes of those who walk the trails.
          </p>
        </div>
      </section>

      {/* CORE PILLARS: High-Fidelity Glass Cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          
          {/* Card 1: Community */}
          <div className="group relative p-10 rounded-[2.5rem] bg-white/30 dark:bg-slate-900/30 backdrop-blur-[32px] border border-white/50 dark:border-white/10 shadow-2xl hover:scale-[1.02] transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-ei_orange/20 to-transparent flex items-center justify-center mb-8 border border-ei_orange/20 shadow-inner">
              <i className="uil uil-users-alt text-3xl text-ei_orange"></i>
            </div>
            <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Community First</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
              A travel-focused social media sanctuary built for real stories, authentic connections, and raw exploration.
            </p>
          </div>

          {/* Card 2: Hidden Gems */}
          <div className="group relative p-10 rounded-[2.5rem] bg-white/50 dark:bg-slate-900/50 backdrop-blur-[32px] border border-white/60 dark:border-white/10 shadow-2xl hover:scale-[1.02] transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-ei_teal/20 to-transparent flex items-center justify-center mb-8 border border-ei_teal/20 shadow-inner">
              <i className="uil uil-scenery text-3xl text-ei_teal"></i>
            </div>
            <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Hidden Gems</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
              We are dedicated to discovering and preserving offbeat destinations that define the true soul of India.
            </p>
          </div>

          {/* Card 3: Authenticity */}
          <div className="group relative p-10 rounded-[2.5rem] bg-white/30 dark:bg-slate-900/30 backdrop-blur-[32px] border border-white/50 dark:border-white/10 shadow-2xl hover:scale-[1.02] transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-ei_blue/20 to-transparent flex items-center justify-center mb-8 border border-ei_blue/20 shadow-inner">
              <i className="uil uil-shield-check text-3xl text-ei_blue"></i>
            </div>
            <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Authenticity</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
              Verified insights and local wisdom to ensure every journey is safe, enjoyable, and deeply meaningful.
            </p>
          </div>
        </div>

        {/* STORY SECTION: The Visual Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-ei_orange/20 to-ei_teal/20 blur-2xl rounded-[3rem] opacity-50 group-hover:opacity-100 transition duration-700"></div>
            <img
              className="relative rounded-[2.5rem] shadow-2xl border-4 border-white/20 dark:border-slate-800/50 object-cover aspect-video lg:aspect-square"
              src="https://images.unsplash.com/photo-1527333656061-ca7adf608ae1?q=80&w=1200&auto=format&fit=crop"
              alt="Indian Landscape"
            />

            <div className="absolute -bottom-8 -right-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50 dark:border-white/10 hidden md:block">
              <p className="text-ei_teal font-black text-5xl tracking-tighter">10K+</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">Active Explorers</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
               <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                 Why <span className="text-ei_orange">ExploIndia?</span>
               </h2>
               <div className="h-1.5 w-20 bg-linear-to-r from-ei_orange to-transparent rounded-full"></div>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              India is a land of diverse cultures, terrains, and experiences.
              From snow-capped Himalayas to tropical backwaters, we realized no existing platform captured the 
              <span className="text-slate-900 dark:text-white font-bold ml-1">soul of Indian travel</span>.
            </p>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              We've pivoted from a simple website to a thriving social platform where local wisdom 
              takes center stage, helping you find the unseen.
            </p>

            <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-900/20 dark:shadow-white/10 hover:scale-105 active:scale-95 transition-all">
               Start Exploring
            </button>
          </div>
        </div>
      </main>

      {/* PREMIUM FOOTER */}
      <footer className="mt-20 py-16 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border-t border-white/40 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
             <h4 className="text-xl font-black text-ei_teal tracking-tighter">ExploIndia</h4>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Discovering the Unseen</p>
          </div>
          
          <div className="flex gap-8">
             <a href="#" className="text-slate-400 hover:text-ei_orange transition-colors"><i className="uil uil-instagram text-2xl"></i></a>
             <a href="#" className="text-slate-400 hover:text-ei_teal transition-colors"><i className="uil uil-twitter text-2xl"></i></a>
             <a href="#" className="text-slate-400 hover:text-ei_blue transition-colors"><i className="uil uil-facebook text-2xl"></i></a>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            © 2026 ExploIndia. Crafted for Explorers.
          </p>
        </div>
      </footer>
    </div>
  );
}