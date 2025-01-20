import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";
import { Chrome, Github } from "lucide-react";


type Providers = 'github' | 'google';

export default function LoginPage() {
  const handleLogin = async (form: FormData) => {
    "use server";
    const provider = form.get("provider") as Providers
    await signIn(provider, {redirectTo: '/dashboard/calendar'})
    console.log(provider);
  };
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-purple-900 to-yellow-500 overflow-hidden">
      <div className="relative w-[300px] bg-white bg-opacity-10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-6">
          <Logo className="max-w-[170px]" />
        </div>
        <form className="flex flex-col gap-4" action={handleLogin}>
          <Button
            variant="outline"
            className="w-full gap-2"
            type="submit"
            name="provider"
            value="github"
          >
            <Github size={20} />
            Entrar com GitHub
          </Button>
          <Button
            variant="outline"
            className="w-full gap-2"
            type="submit"
            name="provider"
            value="google"
          >
            <Chrome />
            Entrar com o Google
          </Button>
        </form>
      </div>
    </div>
  );
}
