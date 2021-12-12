import React, { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

interface DropdownUserProps {
  name: string;
}

const DropdownUser = ({ name }: DropdownUserProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="title-brand menu-button button-brand">
          {name} <HiChevronDown size="20" />
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
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active && "bg-brand-500 text-white"
                } menu-item-active`}
              >
                Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item disabled>
            <span className="opacity-75">Log out</span>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownUser;
