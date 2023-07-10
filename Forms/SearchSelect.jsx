import React, { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Row } from "../Layout/rows";

/*
  itemsExample = [
      { id: 1, label: "Durward Reynolds", disabled: false },
      { id: 2, label: "Kenton Towne", disabled: false },
      { id: 3, label: "Therese Wunsch", disabled: false },
      { id: 4, label: "Benedict Kessler", disabled: true },
      { id: 5, label: "Katelyn Rohan", disabled: false },
    ];
*/

export default function SearchSelect({
  className = "py-2 px-4 rounded-lg bg-background-color border",
  items,
  isMulti = false,
  allowCustomValue = false,
  selected,
  setSelected,
  isNullable = false,
  placeholder = "Rechercher...",
}) {
  const [query, setQuery] = useState("");
  if (isMulti && allowCustomValue) allowCustomValue = false;

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selected} onChange={setSelected} multiple={isMulti} nullable={isNullable}>
      <div className="relative">
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          displayValue={(item) => (isMulti ? item.map((i) => i?.label).join(", ") : item?.label)}
          className={className}
        />
        <Transition
          className="absolute w-full left-2 top-12 z-30"
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-80 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-80 opacity-0"
        >
          <Combobox.Options className={"border max-h-52 w-5/6 overflow-y-scroll shadow-lg rounded-lg"}>
            {filteredItems.map((item, k) => (
              <Combobox.Option key={item.label} value={item} disabled={item.disabled}>
                {({ active, selected, disabled }) => (
                  <Row
                    className={
                      "p-3 ui-disabled:bg-background-dark ui-active:bg-primary-color ui-disabled:text-text-light bg-background-color ui-active:text-primary-on ui-selected:text-primary-color " +
                      (k === 0 && "rounded-t-lg ") +
                      " " +
                      ((!allowCustomValue || query === "") && k === filteredItems.length - 1 && "rounded-b-lg ") +
                      " " +
                      (!disabled && "hover:bg-primary-color hover:text-primary-on ")
                    }
                  >
                    {selected && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <p className="truncate cursor-default ui-selected:font-semibold">{item.label}</p>
                  </Row>
                )}
              </Combobox.Option>
            ))}
            {allowCustomValue && query !== "" && (
              <Combobox.Option value={{ id: query, label: query }}>
                <Row
                  className={
                    "p-3 ui-disabled:bg-background-dark ui-active:bg-primary-color ui-disabled:text-text-light bg-background-color ui-active:text-primary-on ui-selected:text-primary-color rounded-b-lg " +
                    (filteredItems.length === 0 && "rounded-t-lg")
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="truncate cursor-default ui-selected:font-semibold">
                    "<strong>{query}</strong>"
                  </p>
                </Row>
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
