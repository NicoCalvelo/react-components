import React, { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";

/*
  itemsExample = [
      { id: 1, label: "Durward Reynolds", disabled: false },
      { id: 2, label: "Kenton Towne", disabled: false },
      { id: 3, label: "Therese Wunsch", disabled: false },
      { id: 4, label: "Benedict Kessler", disabled: true },
      { id: 5, label: "Katelyn Rohan", disabled: false },
    ];
*/

export default function Select({ items, defaultValue, isMulti = false, placeholder = "Select an option...", isNullable = true, onChange, buttonClassName }) {
  const [selected, setSelected] = useState(
    isMulti
      ? defaultValue
        ? items.filter((e) => defaultValue.find((i) => i.id == e.id) !== undefined)
        : isNullable
        ? []
        : [items[0]]
      : defaultValue
      ? items.find((e) => e.value === defaultValue)
      : isNullable
      ? null
      : items[0]
  );

  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        onChange(value);
      }}
      multiple={isMulti}
    >
      <div className="relative">
        <Listbox.Button
          as="div"
          className={
            buttonClassName !== undefined ? buttonClassName : "flex items-center whitespace-nowrap w-36 max-w-xs space-x-6 py-2 px-4 rounded-lg border"
          }
        >
          {selected && (!isMulti || (isMulti && selected.length > 0)) && (
            <p className="truncate flex-grow">{isMulti ? selected.map((item) => item.label ?? item.name).join(", ") : selected.label ?? selected.name}</p>
          )}
          {(!selected || (isMulti && selected.length === 0)) && <p className="text-text-light font-light">{placeholder}</p>}
          {isNullable && ((!isMulti && selected) || (isMulti && selected.length > 0)) && (
            <svg
              onClick={() => {
                setSelected(isMulti ? [] : null);
                onChange(isMulti ? [] : null);
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 cursor-pointer"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          )}
          {(!selected || (isMulti && selected.length === 0) || !isNullable) && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Listbox.Button>
        <Transition
          className="absolute w-fit right-0 top-12 z-30"
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-80 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-80 opacity-0"
        >
          <Listbox.Options className="border outline-none shadow-lg rounded-lg" as="ul">
            {items.map((item, k) => (
              <Listbox.Option
                className={
                  "flex items-center ui-selected:pl-2 ui-not-selected:pl-8 py-2 first:pt-3 last:pb-3 pr-8 ui-disabled:bg-background-dark last:rounded-b-lg first:rounded-t-lg flex-grow ui-active:bg-primary-color ui-disabled:text-text-light bg-background-color ui-active:text-primary-on ui-selected:text-primary-color "
                }
                key={"item_" + k}
                value={item}
                disabled={item.disabled}
                as="li"
              >
                {({ active, selected, disabled }) => (
                  <>
                    {selected && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <p className="truncate cursor-default ui-selected:font-semibold">{item.label ?? item.name}</p>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
