import Link from "next/link";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header
        className="pt-4 pb-50 px-4 border-b-4 flex items-start justify-between bg-cover bg-center"
        style={{ backgroundImage: "url('/krematoriet.png')" }}
      >
        <Link href="/">
          <div className="bg-white/70 rounded-full p-2">
            <Image
              src="/krempan.png"
              alt="krematoriet"
              width={80}
              height={80}
            />
          </div>
        </Link>
      </header>
      {children}
    </>
  );
};

export default AuthLayout;
