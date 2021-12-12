import { FaDumbbell } from "react-icons/fa";
import Link from "next/link";
import { useAppSelector } from "../app/hooks";
import DropdownUser from "./dropdownUser";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);

  return (
    <>
      <NavbarList href="/">
        <FaDumbbell size="32" />
      </NavbarList>
      {user?.id !== "" ? (
        <>
          <NavbarList href="/workout">Workouts</NavbarList>
          <NavbarList href="/progress">Progress</NavbarList>
          <DropdownUser name={user?.name ?? ""} />
        </>
      ) : (
        <>
          <NavbarList href="/register">Register</NavbarList>
          <NavbarList href="/login">Login</NavbarList>
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
        <a className="title-brand">{children}</a>
      </Link>
    </>
  );
};
