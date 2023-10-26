import React from "react";
import PopOverMenu from "./Popover";
import Switch from "../Forms/Switch";

export default function FiltersPopover({ filters, setFilters, fromLeftToRight = false }) {
  return (
    <PopOverMenu
      buttonClassName="btn flex items-center rounded-full focus:outline outline-1"
      popoverButton={
        <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          <p>Filtrer</p>
        </>
      }
      className={"z-10 shadow-xl w-max mt-1 border rounded bg-background-color " + (fromLeftToRight ? "left-2" : "right-2")}
    >
      {filters.map((filter, k) => (
        <li key={"filter_" + k} className="flex space-x-2 px-4 items-center py-2 border-b">
          <Switch
            fromRightToLeft={!fromLeftToRight}
            label={filter.title}
            selected={filter.active}
            setSelected={(selected) => {
              setFilters([...filters.map((e, k2) => (k == k2 ? { ...e, active: selected } : e))]);
            }}
          />
        </li>
      ))}
    </PopOverMenu>
  );
}
