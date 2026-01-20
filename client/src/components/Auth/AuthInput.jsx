export default function AuthInput({
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-ei_teal"
    />
  );
}
