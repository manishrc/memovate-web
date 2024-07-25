export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
      <div className="sm:w-80 px-6 w-full">{children}</div>
    </div>
  );
}

export const viewport = {
  // minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover
  themeColor: '#F4F4F5',
  minimumScale: '1',
  initialScale: '1',
  width: 'device-width',
  shrinkToFit: 'no',
  userScalable: 'no',
  viewportFit: 'cover',
};
