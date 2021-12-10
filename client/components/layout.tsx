import Link from "next/link";
import { FaDumbbell } from "react-icons/fa";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full flex flex-col bg-gray-200">
      <header className="flex items-center justify-around h-12 px-2">
        <Navbar href="/">
          <FaDumbbell size="32" />
        </Navbar>
        <Navbar href="/register">Register</Navbar>
        <Navbar href="/login">Login</Navbar>
      </header>
      <main className="h-full sm:h-screen-auto py-4">{children}</main>
      <footer className="sm:h-full-auto flex items-center justify-center flex-col py-4">
        <p className="title-font">Copyright Powerful &copy; 2021</p>
        <a className="title-font" href="https://github.com/makyfj/Powerful">
          Source Code
        </a>
      </footer>
    </div>
  );
};

export default Layout;

interface NavbarProps {
  children: React.ReactNode;
  href: string;
}

const Navbar = ({ children, href }: NavbarProps) => {
  return (
    <>
      <Link href={href}>
        <a className="title-font">{children}</a>
      </Link>
    </>
  );
};
