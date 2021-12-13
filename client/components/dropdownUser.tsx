import React, { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

import { removeCredentials } from "../app/features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

interface DropdownUserProps {
  id: string;
  name: string;
}

const DropdownUser = ({ name, id }: DropdownUserProps) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const profileHandler = () => {
    router.push(`/user/${id}`);
  };
  const workoutHandler = () => {
    router.push(`/workout/${id}`);
  };

  const progressHandler = () => {
    router.push(`/progress/${id}`);
  };

  const loginHandler = () => {
    router.push("/login");
  };

  const registerHandler = () => {
    router.push("/register");
  };

  const logoutHandler = () => {
    try {
      dispatch(removeCredentials());
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="title-brand menu-button button-brand">
          {/* User is logged in display name else display login and register*/}

          {name !== "" ? (
            <>
              {name} <HiChevronDown size="20" />
            </>
          ) : (
            <>
              Options <HiChevronDown />
            </>
          )}
        </Menu.Button>
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
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-brand-500 text-white"
                    } menu-item-active`}
                    onClick={profileHandler}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>

              {/* It would display on only on mobile devices*/}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-brand-500 text-white"
                    } menu-item-active menu-item-hidden`}
                    onClick={workoutHandler}
                  >
                    Workout
                  </button>
                )}
              </Menu.Item>

              {/* It would display on only on mobile devices*/}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-brand-500 text-white"
                    } menu-item-active menu-item-hidden`}
                    onClick={progressHandler}
                  >
                    Progress
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-brand-500 text-white"
                    } menu-item-active`}
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-brand-500 text-white"
                    } menu-item-active menu-item-hidden`}
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-brand-500 text-white"
                    } menu-item-active`}
                    onClick={registerHandler}
                  >
                    Register
                  </button>
                )}
              </Menu.Item>
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownUser;

// Disable button example
// <Menu.Item disabled>
//   <span className="opacity-75">Log out</span>
// </Menu.Item>
