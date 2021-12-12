import { FaDumbbell } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <NavbarList href="/">
        <FaDumbbell size="32" />
      </NavbarList>
      <NavbarList href="/register">Register</NavbarList>
      <NavbarList href="/login">Login</NavbarList>
    </>
  );
};

export default Navbar;

interface NavbarListProps {
  children: React.ReactNode;
  href: string;
}

const NavbarList = ({ children, href }: NavbarListProps) => {
  return (
    <>
      <Link href={href}>
        <a className="title-brand">{children}</a>
      </Link>
    </>
  );
};
