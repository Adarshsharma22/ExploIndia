import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <>

<header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between h-16">
        <a href="index.html" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ei_orange via-orange-500 to-ei_teal shadow-[0_4px_12px_rgba(255,140,0,0.35)] flex items-center justify-center text-white text-2xl font-extrabold transition-all duration-500 hover:scale-110">E</div>
          <span className="font-bold text-xl text-slate-800 dark:text-white/90 tracking-wide">Explo<span className="text-ei_orange">India</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
            <Link
                to="/home"
                className="px-4 py-2 rounded-full text-slate-700 dark:text-white/90 hover:text-white 
                           hover:bg-gradient-to-r from-ei_teal to-ei_blue 
                           hover:shadow-[0_0_12px_rgba(0,180,180,0.4)]
                           transition-all duration-300"
              >
                Home
            </Link>
        </nav>
      </div>
    </div>
  </header>    
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center py-20">


      <div className="space-y-6">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white/90">
          Share your 
          <span className="text-ei_orange">journeys</span>,<br />

          <span className="bg-gradient-to-r from-ei_orange via-ei_blue to-ei_teal 
                       bg-clip-text text-transparent">
            discover new destinations
          </span>
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
          ExploIndia is a community-driven platform where travellers share stories,
          photos and tips about the incredible mountains, beaches and heritage 
          monuments across India.
        </p>

        <div className="pt-2 flex gap-4">
          
          
          <a href="Signup"
             className="px-8 py-3.5 rounded-full font-semibold text-white text-lg
                    bg-gradient-to-r  from-ei_teal to-ei_blue
                    hover:shadow-[0_10px_25px_rgba(0,180,180,0.55)]
                    hover:-translate-y-1 hover:brightness-110
                    transition-all duration-300">
            Join Now
          </a>

          
          <a href="#explore"
             className="px-8 py-3.5 rounded-full font-semibold text-ei_teal text-lg
                    border-2 border-ei_teal bg-white
                    hover:bg-ei_teal hover:text-white
                    hover:shadow-[0_6px_18px_rgba(0,180,180,0.45)]
                    hover:-translate-y-1
                    transition-all duration-300">
            Explore
          </a>
        </div>

      </div>

      
      <div className="relative">
        <div className="grid grid-cols-3 gap-4 animate-[float_6s_ease-in-out_infinite]">

          <img className="col-span-2 h-48 w-full rounded-2xl object-cover 
                      shadow-[0_8px_20px_rgba(255,140,0,0.25)]
                      hover:scale-[1.03] transition-all duration-300"
               src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop"
               alt="Taj Mahal" />

          <img className="h-48 w-full rounded-2xl object-cover
                      shadow-[0_8px_20px_rgba(0,180,180,0.25)]
                      hover:scale-[1.03] transition-all duration-300"
               src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop"
               alt="Goa Beach" />

          <img className="h-48 w-full rounded-2xl object-cover
                      shadow-[0_8px_20px_rgba(0,120,255,0.25)]
                      hover:scale-[1.03] transition-all duration-300"
               src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
               alt="Himalayas" />

          <img className="col-span-2 h-48 w-full rounded-2xl object-cover
                      shadow-[0_8px_20px_rgba(255,140,0,0.25)]
                      hover:scale-[1.03] transition-all duration-300"
               src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop"
               alt="Hawa Mahal" />

        </div>
      </div>

    </div>
  </div>

      {/* FOOTER */}
      <footer className="bg-slate-100 dark:bg-slate-800 py-6 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            © 2025 ExploIndia. Made with ❤️ for Travellers.
          </p>
        </div>
      </footer>
    </>
  );
};


