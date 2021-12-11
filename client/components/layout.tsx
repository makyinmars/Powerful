import Link from "next/link";
import { FaDumbbell } from "react-icons/fa";
import Logo from "./logo";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}

      <header className="flex items-center justify-around h-12 px-2">
        <Navbar href="/">
          <FaDumbbell size="32" />
        </Navbar>
        <Navbar href="/register">Register</Navbar>
        <Navbar href="/login">Login</Navbar>
      </header>

      {/* Main */}

      <main className="h-full">
        <Logo />
        {children}
      </main>

      {/* Footer */}

      <footer className="h-40 flex items-center justify-center flex-col">
        <a className="title-brand" href="https://github.com/makyfj/Powerful">
          Source Code {"♥️"}
        </a>
        <p className="title-brand">Copyright Powerful &copy; 2021</p>
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
        <a className="title-brand">{children}</a>
      </Link>
    </>
  );
};
