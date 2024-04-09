import React from "react";
import { Tab } from "@headlessui/react";
import Spinner from "../Components/Spinner";

export default function TabsPanel({
  className = "",
  vertical = false,
  tabs = [{ title: "tab 1", disabled: false }],
  ...props
}) {
  return (
    <Tab.Group>
      <div className={"flex flex-1 " + (vertical ? " " : " flex-col ") + className}>
        <Tab.List
          className={
            "flex border-text-light border-opacity-50 " +
            (vertical ? " flex-col h-full border-r space-y-2 px-1" : " w-full py-1 border-b space-x-2")
          }
        >
          {tabs.map((e, k) => (
            <Tab
              className={({ selected }) =>
                "w-fit flex items-center justify-start pl-4 pr-6 space-x-2 py-2 transition-all duration-150 " +
                (selected ? " font-bold" : "  hover:text-primary-color text-sm text-text-light hover:underline")
              }
              key={"tab_" + k}
              disabled={e.disabled}
            >
              {e.icon}
              <p>{e.title}</p>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>{props.children}</Tab.Panels>
      </div>
    </Tab.Group>
  );
}

export function TabPanel({ className = "", isLoading = false, ...props }) {
  return (
    <Tab.Panel className={className}>
      {isLoading && (
        <div className="w-full h-full pt-10">
          <Spinner />
        </div>
      )}
      {!isLoading && props.children}
    </Tab.Panel>
  );
}
