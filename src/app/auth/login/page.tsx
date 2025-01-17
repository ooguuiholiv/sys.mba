import Image from "next/image";
import Logo from "@/assets/logo.svg";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-[1.5fr, 1fr] h-screen">
      <aside>
        <Image
          width={1000}
          height={800}
          src="/images/auth-bg.webp"
          alt="Escritorio com mesas."
          className="w-full h-full object-cover"
          quality={100}
        />
      </aside>

      <form className="p-10 flex justify-center flex-col">
        <div className="flex items-center justify-between mb-18">
            <Logo className="max-w-[90px]" />
        </div>
      </form>
    </div>
  );
}
