import React from "react";
import { Tab } from "@headlessui/react";
import Spinner from "../Components/Spinner";

export default function TabsPanel({ vertical = false, tabs = [{ title: "tab 1", disabled: false }], ...props }) {
  return (
    <Tab.Group>
      <div className={"flex flex-1 " + (vertical ? " " : " flex-col ")}>
        <Tab.List className={"flex border-text-light border-opacity-50 " + (vertical ? " flex-col h-full border-r space-y-2 px-1" : " w-full py-1 border-b space-x-2")}>
          {tabs.map((e, k) => (
            <Tab
              className={({ selected }) =>
                "w-48 flex items-center justify-start px-3 space-x-2 border border-primary-color rounded py-2 text-sm transition-all duration-300 " +
                (selected ? " text-primary-on bg-primary-color font-semibold" : "  hover:bg-primary-color hover:bg-opacity-10")
              }
              key={"tab_" + k}
              disabled={e.disabled}
            >
              {e.icon}
              <p>{e.title}</p>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="p-2">{props.children}</Tab.Panels>
      </div>
    </Tab.Group>
  );
}

export function TabPanel({ isLoading = false, ...props }) {
  return (
    <Tab.Panel>
      {isLoading && (
        <div className="w-full h-full pt-10">
          <Spinner />
        </div>
      )}
      {!isLoading && props.children}
    </Tab.Panel>
  );
}
