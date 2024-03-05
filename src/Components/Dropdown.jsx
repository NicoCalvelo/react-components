import React from "react";
import { Menu } from "@headlessui/react";
import {Column} from "../Layout/columns";

export default function Dropdown({ title = "Dropdown", ...props }) {
  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="font-semibold rounded-lg border bg-transparent hover:bg-background-dark hover:bg-opacity-20 py-2 disable:bg-background-dark disabled:opacity-50 text-current cursor-pointer flex items-center pr-4 pl-6">
          <p>{title}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Menu.Button>
        <Menu.Items>
          <Column className="absolute border w-52 rounded-lg bg-background-color shadow-xl z-30 right-0 top-12 p-2 space-y-2">{props.children}</Column>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export  function DropdownItem({ className = "", disabled = false, onClick, ...props }) {
  return (
    <Menu.Item disabled={disabled}>
      <a
        className={
          "px-4 py-1.5 rounded ui-disabled:text-text-light ui-disabled:bg-background-dark ui-active:text-primary-on ui-active:bg-primary-light " + className
        }
        onClick={onClick}
      >
        {props.children}
      </a>
    </Menu.Item>
  );
}
