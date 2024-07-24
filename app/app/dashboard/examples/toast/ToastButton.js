"use client";
import { toast } from "sonner";
export default function ToastButton() {
  return (
    <button
      className="p-4 m-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      onClick={() => {
        toast("Your toast is ready!");
      }}
    >
      Toast
    </button>
  );
}
