import React, { useEffect, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { Row } from "../Layout/Rows";

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
  title,
  className = "",
  items,
  required = false,
  isMulti = false,
  allowCustomValue = false,
  selected,
  setSelected,
  supportingText,
  placeholder = "Rechercher...",
  focusColor = "#2563EB",
}) {
  const [isFocus, setFocus] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery("");
  }, [selected]);

  if (isMulti && Array.isArray(selected)) items = [...items, ...selected.filter((item) => !items.find((i) => i.id === item.id))];
  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selected} onChange={setSelected} multiple={isMulti}>
      <div className="relative flex items-center">
        {title && (
          <label
            className={
              `absolute pointer-events-none transition-colors text-xs truncate  -top-2 left-2 px-2 bg-background-color dark:bg-background-color ` +
              (isFocus ? " text-current font-medium" : " text-text-light dark:text-text-light")
            }
          >
            {title}
          </label>
        )}
        <ComboboxInput
          required={required}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => setFocus(false)}
          displayValue={(item) => (isMulti ? item?.map((i) => i?.label).join(", ") : item?.label)}
          className={"peer input !w-full border border-gray-300 rounded-lg pl-2 pr-4 " + (title ? "pt-3 pb-2.5" : "py-1.5") + className}
        />
        <ComboboxButton className="peer absolute -right-2 top-0 h-full w-14 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </ComboboxButton>
        <i className="fi fi-ss-exclamation pointer-events-none text-sm opacity-0 peer-invalid:opacity-100 absolute right-1 text-error-color" />
        <Transition
          className="absolute w-full left-2 top-12 z-30"
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-80 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-80 opacity-0"
        >
          <ComboboxOptions className="max-h-72 w-5/6 overflow-y-auto shadow-lg rounded-xl">
            {filteredItems &&
              filteredItems?.map((item, k) => (
                <ComboboxOption key={item.label} value={item} disabled={item.disabled}>
                  {({ active, selected, disabled }) => (
                    <Row
                      className={
                        "p-3 ui-disabled:bg-background-dark ui-disabled:text-text-light bg-background-color " +
                        (k === 0 && " ") +
                        " " +
                        ((!allowCustomValue || query === "") && k === filteredItems.length - 1 && " ") +
                        " " +
                        (!disabled && "hover:bg-gray-200 cursor-pointer ")
                      }
                      style={{ color: selected ? focusColor : "" }}
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
                </ComboboxOption>
              ))}
            {allowCustomValue && query != "" && query.split(", ")[query.split(", ").length - 1] !== "" && (
              <ComboboxOption value={{ id: query.split(", ")[query.split(", ").length - 1], label: query.split(", ")[query.split(", ").length - 1] }}>
                <Row
                  className={
                    "p-3 ui-disabled:bg-background-dark ui-active:bg-primary-color ui-disabled:text-text-light bg-background-color ui-active:text-primary-on ui-selected:text-primary-color " +
                    (filteredItems.length === 0 && "rounded-t-lg")
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="truncate cursor-default ui-selected:font-semibold">
                    "<strong>{query.split(", ")[query.split(", ").length - 1]}</strong>"
                  </p>
                </Row>
              </ComboboxOption>
            )}
          </ComboboxOptions>
        </Transition>
      </div>
      {supportingText && <small className="text-text-light italic px-2 pt-1 text-xs">{supportingText}</small>}
    </Combobox>
  );
}
