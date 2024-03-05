import React from "react";
import { Popover, Transition } from "@headlessui/react";

export default function PopOverMenu({ className = "", buttonClassName = "btn", popoverButton, ...props }) {
  return (
    <Popover className="relative">
      <Popover.Button className={buttonClassName}>{popoverButton}</Popover.Button>
      <Popover.Panel as="ul" className={"absolute " + className}>
        {props.children}
      </Popover.Panel>
    </Popover>
  );
}
