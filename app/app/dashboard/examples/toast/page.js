import ToastButton from './ToastButton';
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">
        Welcome to {process.env.NEXT_PUBLIC_APP_NAME}!
      </h1>
      <ToastButton />
    </div>
  );
}
