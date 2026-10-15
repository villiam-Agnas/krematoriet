import Image from "next/image";
import Link from "next/link";
import AccountLinks from "./AccountLinks";
import Search from "./search";

const Header = () => {
  return (
    <header
      className="pt-4 pb-50 px-4 border-b-4 flex justify-between bg-cover bg-center"
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
