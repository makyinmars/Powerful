import Link from "next/link";
import { FaDumbbell } from "react-icons/fa";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-brand">
      <header className="flex items-center justify-around h-12 px-2">
        <Navbar href="/">
          <FaDumbbell />
        </Navbar>
        <Navbar href="/register">Register</Navbar>
        <Navbar href="/login">Login</Navbar>
      </header>
      <main className="mb-auto h-full">{children}</main>
      <footer className="h-auto flex items-center justify-center flex-col pb-2">
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
