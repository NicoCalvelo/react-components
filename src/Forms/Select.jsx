import Spinner from "../Components/Spinner";
import React, { useState, useEffect } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";

/*
  itemsExample = [
      { id: 1, label: "Durward Reynolds", disabled: false },
      { id: 2, label: "Kenton Towne", disabled: false },
      { id: 3, label: "Therese Wunsch", disabled: false },
      { id: 4, label: "Benedict Kessler", disabled: true },
      { id: 5, label: "Katelyn Rohan", disabled: false },
    ];
*/

export default function Select({
  items,
  defaultValue,
  title,
  loading = false,
  isMulti = false,
  placeholder = "Sélectionner une option...",
  isNullable = true,
  onChange,
  buttonClassName = "",
  className = "",
}) {
  const [selected, setSelected] = useState(loading ? null : getSelected());

  useEffect(() => {
    if (!loading && selected === null) setSelected(getSelected());
  }, [loading]);

  function getSelected() {
    return isMulti
      ? defaultValue
        ? items.filter((e) => defaultValue.find((i) => (i.value ?? i.id) == (e.value ?? e.id)) !== undefined)
        : isNullable
        ? []
        : [items[0]]
      : defaultValue
      ? items.find((i) => i.id === defaultValue.id)
      : null;
  }

  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        if (onChange) onChange(value);
      }}
      multiple={isMulti}
      by="label"
    >
      <div className={"flex flex-col " + className}>
        {title && (
          <label
            className={`absolute pointer-events-none transition-colors text-xs truncate -translate-y-2 translate-x-1 px-2 bg-background-color z-10  group-focus:text-current group-focus:font-medium text-text-light dark:text-text-light`}
          >
            {title}
          </label>
        )}
        <ListboxButton
          as="div"
          className={
            buttonClassName +
            "relative peer flex items-center max-w-52 placeholder:italic placeholder:text-gray-300 input !w-full flex-shrink-0 border border-gray-300 rounded-lg pl-2 pr-3 " +
            (title ? "pt-3 pb-2.5" : "py-2") +
            " " +
            (loading ? " min-h-10" : "")
          }
        >
          {loading ? (
            <p className="text-text-light flex-grow truncate font-light italic pr-6">{placeholder}</p>
          ) : (
            <>
              {selected && (!isMulti || (isMulti && selected?.length > 0)) && (
                <p className="font-medium truncate flex-grow">
                  {isMulti ? selected.map((item) => item.label ?? item.name).join(", ") : selected.label ?? selected.value ?? selected.name}
                </p>
              )}
              {(selected === null || (isMulti && selected?.length === 0)) && (
                <p className="text-text-light flex-grow truncate font-light italic">{placeholder}</p>
              )}
              {isNullable && ((!isMulti && selected) || (isMulti && selected?.length > 0)) && (
                <svg
                  onClick={() => {
                    setSelected(isMulti ? [] : null);
                    if (onChange) onChange(isMulti ? [] : null);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 cursor-pointer flex-shrink-0"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              )}
              {(!selected || (isMulti && selected.length === 0) || !isNullable) && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-4 flex-shrink-0">
                  <path
                    fillRule="evenodd"
                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </>
          )}
          {loading && <Spinner className="w-4 h-4 absolute right-1" />}
        </ListboxButton>
        {!loading && (
          <Transition
            className="absolute w-fit z-20"
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-80 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-80 opacity-0"
          >
            <ListboxOptions className="border outline-none w-full max-w-sm overflow-auto max-h-64 shadow-lg rounded-lg" as="ul">
              {items.map((item, k) => {
                const isSelected = selected && (isMulti ? selected.find((i) => i.id === item.id) : selected.id === item.id);
                return (
                  <ListboxOption
                    key={"item_" + k}
                    className={
                      "flex items-center ui-selected:pl-2 ui-not-selected:pl-8 hover:bg-gray-50 py-2 first:pt-3 last:pb-3 pr-8 ui-disabled:bg-gray-300 last:rounded-b-lg first:rounded-t-lg max-w-full ui-active:underline ui-disabled:text-text-light bg-background-color " +
                      (isSelected ? "!text-primary-color" : "")
                    }
                    value={item}
                    disabled={item.disabled}
                    as="li"
                  >
                    {isSelected && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2 flex-shrink-0">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <p className={"max-w-full text-wrap cursor-default " + (isSelected ? "font-semibold" : "")}>{item.label ?? item.value ?? item.name}</p>
                  </ListboxOption>
                );
              })}
            </ListboxOptions>
          </Transition>
        )}
      </div>
    </Listbox>
  );
}
