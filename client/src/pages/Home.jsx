// src/pages/Home.jsx
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import TripComposer from "../components/TripComposer";
import TripCard from "../components/TripCard";

export default function Home() {
  return (
    <main className="pt-20 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <aside className="lg:col-span-3 hidden lg:block">
          <LeftSidebar />
        </aside>

        <section className="lg:col-span-6">
          <TripComposer />
          <tripCard />
        </section>

        <aside className="lg:col-span-3">
          <RightSidebar />
        </aside>

      </div>
    </main>
  );
}
