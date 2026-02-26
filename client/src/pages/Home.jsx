// src/pages/Home.jsx
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import TripComposer from "../components/TripComposer";

export default function Home() {
  return (
    <main className="pt-10 max-w-8xl mx-auto px-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <aside className="lg:col-span-3 hidden lg:block">
          <LeftSidebar />
        </aside>

        <section className="lg:col-span-6">
          <TripComposer />
          
        </section>

        <aside className="lg:col-span-3">
          <RightSidebar />
        </aside>

      </div>
    </main>
  );
}
