import React from 'react';
import { Tab } from "@headlessui/react";
import Spinner from "../badges/spinner";

export default function TabsPanel({ horizontal = true, tabs = [{ title: "tab 1", disabled: false }], ...props }) {
  return (
    <Tab.Group>
      <div className={"flex h-full " + (horizontal ? " space-x-2" : " flex-col space-y-2")}>
        <Tab.List
          className={
            "flex p-2 border-gray-400 " +
            (horizontal ? " flex-col h-full border-r space-y-2" : " w-full border-b space-x-2")
          }
        >
          {tabs.map((e, k) => (
            <Tab
              className={({ selected }) =>
                "w-48 flex items-center justify-start px-4 space-x-2 rounded-lg py-2.5 text-sm transition-all duration-300 " +
                (selected
                  ? "bg-gray-50 text-background shadow font-semibold"
                  : "  hover:bg-gray-50 hover:bg-opacity-10")
              }
              key={"tab_" + k}
              disabled={e.disabled}
            >
              {e.icon}
              <p>{e.title}</p>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={"h-full w-full overflow-y-scroll " + (horizontal ? "px-5 py-2" : "px-2 py-5")}>
          {props.children}
        </Tab.Panels>
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
