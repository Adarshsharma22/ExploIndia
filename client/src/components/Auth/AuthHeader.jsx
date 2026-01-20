import { Link } from "react-router-dom";

export default function AuthHeader() {
  return (
    <header className="w-full flex items-center justify-between mb-8">
      <Link to="/login" className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-Linear-to-br from-ei_orange via-orange-500 to-ei_teal text-white text-2xl font-extrabold flex items-center justify-center">
          E
        </div>
        <span className="text-xl font-bold">
          Explo<span className="text-ei_orange">India</span>
        </span>
      </Link>

      <Link
        to="/signup"
        className="text-sm font-semibold text-ei_orange hover:text-ei_teal"
      >
        Sign Up
      </Link>
    </header>
  );
}
