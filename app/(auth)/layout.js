export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
      <div className="sm:w-80 px-2 w-full">{children}</div>
    </div>
  );
}
