import React, { useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";

export default function TabsPanel({ className = "", vertical = false, tabs = [{ title: "tab 1", disabled: false }], onChange, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [leftPosition , setLeftPosition] = useState(0);
  useEffect(() => {
    let pos = 0;
    for (let i = 0; i < selectedIndex; i++) {
      pos += document.querySelectorAll(".tab")[i].offsetWidth;
    }
    pos += document.querySelectorAll(".tab")[selectedIndex].offsetWidth / 2 - 16;
    setLeftPosition(pos);
  }, [selectedIndex]);
  return (
    <TabGroup
      onChange={(index) => {
        if (onChange) onChange(index);
        setSelectedIndex(index);
      }}
    >
      <div className={"flex flex-1 w-full " + (vertical ? " " : " flex-col ") + className}>
        <TabList className={"relative flex w-full bg-slate-600 rounded text-white " + (vertical ? " flex-col h-full space-y-2 px-1" : " w-full py-1")}>
          {tabs.map((e, k) => (
            <Tab
              className={({ selected }) =>
                "tab flex w-fit items-center justify-center hover:bg-gray-700 rounded transition-all duration-150 px-4 py-2.5 !outline-none focus:outline-none " +
                (selected ? " font-bold" : "  text-gray-50")
              }
              key={"tab_" + k}
              disabled={e.disabled}
            >
              {e.icon}
              <p>{e.title}</p>
            </Tab>
          ))}
          <div
            className="w-8 h-1 transition-all duration-300 ease-out rounded-full mx-auto absolute bottom-1"
            style={{ left: leftPosition + "px", backgroundColor: "#" + (props.formColor ?? "ccc") }}
          ></div>
        </TabList>
        <TabPanels>{typeof props.children === "function" ? props.children(selectedIndex) : props.children}</TabPanels>
      </div>
    </TabGroup>
  );
}
