import Image from "next/image";
import Link from "next/link";
import AccountLinks from "./AccountLinks";
import Search from "./search";

const Header = () => {
  return (
    <header
      className="flex flex-col items-center gap-4 border-b-4 bg-cover bg-center px-4 pt-4 pb-16 md:flex-row md:justify-between md:pb-50"
      style={{ backgroundImage: "url('/krematoriet.png')" }}
    >
      <Link href="/">
        <div className="bg-white/70 rounded-full p-2">
          <Image src="/krempan.png" alt="krematoriet" width={80} height={80} />
        </div>
      </Link>
      <Search />
      <AccountLinks />
    </header>
  );
};

export default Header;
