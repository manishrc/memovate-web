import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

export default function LoginWithDropbox() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("dropbox");
      }}
    >
      <Button
        variant="outline"
        size="lg"
        className="w-full bg-[#0061fe] hover:bg-[#0057e5] text-white hover:text-white border-none"
        type="submit"
      >
        Continue with Dropbox
      </Button>
    </form>
  );
}
