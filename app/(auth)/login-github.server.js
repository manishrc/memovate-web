import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

export default function LoginWithGitHub() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button
        size="lg"
        className="w-full bg-[#1F2328] hover:bg-[#32383F]"
        type="submit"
      >
        Continue with GitHub
      </Button>
    </form>
  );
}
