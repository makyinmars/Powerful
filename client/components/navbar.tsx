import { FaDumbbell } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

import { useAppSelector } from "../app/hooks";
import DropdownUser from "./dropdownUser";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

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
      {theme === "dark" ? (
        <div>
          <button onClick={toggleTheme}>
            <BsFillMoonFill className="icon-mode" />
          </button>
        </div>
      ) : (
        <div>
          <button onClick={toggleTheme}>
            <BsSunFill className="icon-mode" />
          </button>
        </div>
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
