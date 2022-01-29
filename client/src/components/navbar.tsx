import { FaDumbbell } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useAppSelector } from "@/app/hooks";
import DropdownUser from "./dropdownUser";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <NavbarList href="/">
        <FaDumbbell size="32" />
      </NavbarList>
      {user?.id !== undefined ? (
        <>
          <NavbarList href={`/workout/user/${user.id}`}>Workout</NavbarList>
          <NavbarList href={`/progress/user/${user.id}`}>Progress</NavbarList>
          <DropdownUser name={user?.name ?? ""} id={user?.id ?? ""} />
        </>
      ) : (
        <>
          <DropdownUser name={""} id={""} />
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
        <a className={`${href !== "/" && "navbar-list-hidden"} title-brand`}>
          {children}
        </a>
      </Link>
    </>
  );
};
