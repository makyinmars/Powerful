import { FaDumbbell } from "react-icons/fa";
import Link from "next/link";
import { useAppSelector } from "../app/hooks";
import DropdownUser from "./dropdownUser";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <NavbarList href="/">
        <FaDumbbell size="32" />
      </NavbarList>
      {user?.id !== undefined ? (
        <>
          <NavbarList href="/workout">Workout</NavbarList>
          <NavbarList href={`/progress/user/${user.id}`}>Progress</NavbarList>
          <DropdownUser name={user?.name ?? ""} id={user?.id ?? ""} />
        </>
      ) : (
        <>
          <NavbarList href="/register">Register</NavbarList>
          <NavbarList href="/login">Login</NavbarList>
          <DropdownUser name={""} id={""} />
        </>
      )}
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
        <a className={`${href !== "/" && "navbar-list-hidden"} title-brand`}>
          {children}
        </a>
      </Link>
    </>
  );
};
