import React, { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

import { removeCredentials } from "@/app/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";

interface DropdownUserProps {
  id: string;
  name: string;
}

const DropdownUser = ({ name, id }: DropdownUserProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {name !== "" ? (
          <MenuButton text={name} />
        ) : (
          <MenuButton text="Options" css="menu-item-hidden" />
        )}
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="menu-items">
          {/* If user is logged in, it will display user options
          else it will display login and register options */}

          {name !== "" ? (
            <>
              {/* It would display on only on mobile devices*/}
              <MenuItem text="Profile" routerLink={`/user/${id}`} />
              <MenuItem
                text="Workout"
                routerLink={`/workout/user/${id}`}
                css="menu-item-hidden"
              />
              <MenuItem
                text="Progress"
                routerLink={`/progress/user/${id}`}
                css="menu-item-hidden"
              />
              <MenuItem text="Logout" routerLink="/" />
            </>
          ) : (
            <>
              <MenuItem text="Login" routerLink="/login" />
              <MenuItem text="Register" routerLink="/register" />
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownUser;

interface MenuButtonProps {
  text: string;
  css?: string;
}

const MenuButton = ({ text, css }: MenuButtonProps) => {
  return (
    <Menu.Button className={`title-brand menu-button button-brand ${css}`}>
      {/* User is logged in display name else display login and register*/}
      {text} <HiChevronDown size="20" />
    </Menu.Button>
  );
};

interface MenuItemProps {
  text: string;
  routerLink: string;
  css?: string;
}

const MenuItem = ({ text, routerLink, css }: MenuItemProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    if (routerLink === "/") {
      try {
        dispatch(removeCredentials());
        router.push(routerLink);
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push(routerLink);
    }
  };

  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active && "bg-brand-500 text-gray-900"
            } menu-item-active ${css}`}
            onClick={onClickHandler}
          >
            {text}
          </button>
        )}
      </Menu.Item>
    </>
  );
};

// Disable button example
// <Menu.Item disabled>
//   <span className="opacity-75">Log out</span>
// </Menu.Item>
