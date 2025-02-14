import React from "react";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { useLocation } from "react-router-dom";

export default function PopOverMenu({ className = "", buttonClassName = "", buttonText, ...props }) {
  const location = useLocation();
  if (!className.includes("bg-")) className += " bg-background-color";
  if (!className.includes("z-")) className += " z-10";
  if (!className.includes("shadow-")) className += " shadow-xl";

  return (
    <Popover key={location.pathname} className="relative">
      <PopoverButton
        onClick={(e) => e.stopPropagation()}
        className={"btn space-x-2 focus:outline-secondary-dark text-secondary-color font-normal !px-4 hover:underline " + buttonClassName}
      >
        <p>{buttonText}</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 16L6 10H18L12 16Z"></path>
        </svg>
      </PopoverButton>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-90 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-90 opacity-0"
      >
        <PopoverPanel as="ul" className={"absolute top-10 left-0 bg-background-color rounded shadow overflow-clip " + className}>
          {props.children}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
