import React from "react";
import { Popover, Transition } from "@headlessui/react";

export default function PopOverMenu({ className = "", buttonClassName = "btn", popoverButton, ...props }) {
  return (
    <Popover>
      <Popover.Button className={buttonClassName}>{popoverButton}</Popover.Button>
      <Popover.Panel
        as="ul"
        className={className + "absolute bg-background-dark right-1 z-20 shadow-glow rounded-2xl "}
      >
        {props.children}
      </Popover.Panel>
    </Popover>
  );
}

export function PopOverMenuItem({
  onClick,
  className = "",
  isLast = false,
  isFirst = false,
  disabled = false,
  ...props
}) {
  let style = disabled
    ? "text-gray-400 cursor-default"
    : "hover:bg-gray-800 hover:text-gray-100 transition duration-500 cursor-pointer";
  style = style + " " + (isLast ? "rounded-b-2xl pb-4 " : " ") + (isFirst ? "rounded-t-2xl border-b pt-4" : "border-b");

  return (
    <button
      onClick={() => (disabled ? () => {} : onClick())}
      type="button"
      className={
        className +
        " " +
        style +
        " flex space-x-2 items-center text-left px-6 border-gray-800 focus:outline-none focus:ring-0 py-2 w-full "
      }
    >
      {props.children}
    </button>
  );
}
