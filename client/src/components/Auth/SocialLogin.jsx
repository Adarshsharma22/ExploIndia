export default function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      <button className="py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700">
        Google
      </button>

      <button className="py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700">
        Facebook
      </button>
    </div>
  );
}
