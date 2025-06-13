import { Row } from "../Layout/Rows";
import Spinner from "../Components/Spinner";
import React, { useEffect, useMemo, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";

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
  isMulti = false,
  allowCustomValue = false,
  selected,
  setSelected,
  supportingText,
  placeholder = "Rechercher...",
  loading = false,
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery("");
  }, [selected]);

  if (isMulti && Array.isArray(selected) && items) {
    items = [...items, ...selected.filter((item) => !items.find((i) => i.id === item.id))];
  }

  const filteredItems = useMemo(() => {
    if (query === "" || loading) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter((item) => {
      const label = item.label || item.value || item.name;
      return label ? label.toLowerCase().includes(lowerQuery) : false;
    });
  }, [query, items]);

  return (
    <Combobox value={selected} onChange={setSelected} multiple={isMulti} onClose={() => setQuery("")}>
      <div className={"flex flex-col items-center " + className}>
        <Row className="relative">
          {title && (
            <label
              className={`absolute pointer-events-none transition-colors text-xs truncate -top-2 left-2 px-2 bg-background-color text-text-light peer-focus:text-current peer-focus:font-medium`}
            >
              {title}
            </label>
          )}
          <ComboboxInput
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            displayValue={(item) =>
              loading ? undefined : isMulti ? item?.map((i) => i?.label || i?.value || i?.name).join(", ") : item?.label || item?.value || item?.name
            }
            className={"peer input !w-full border border-gray-300 rounded-lg pl-2 pr-10 " + (title ? "pt-3 pb-2.5" : "py-2")}
          />
          {!loading && (
            <ComboboxButton className="peer absolute -right-2 top-0 h-full w-14 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </ComboboxButton>
          )}
          {loading && <Spinner className="w-4 h-4 absolute right-2" />}
          <i className="fi fi-ss-exclamation pointer-events-none text-sm opacity-0 peer-invalid:opacity-100 absolute right-1 text-error-color" />
        </Row>
        {supportingText && <small className="text-text-light italic px-2 pt-1 text-xs">{supportingText}</small>}
        <ComboboxOptions className="absolute z-20 translate-y-8 max-h-64 max-w-sm w-full overflow-y-auto shadow-lg rounded-xl">
          {filteredItems &&
            filteredItems?.map((item, k) => (
              <ComboboxOption
                key={item.id + "_" + selected?.id}
                value={item}
                disabled={item.disabled}
                className="flex items-center max-w-sm p-3 pr-16 ui-disabled:bg-background-dark ui-disabled:text-text-light data-[selected]:text-primary-color ui-selected:text-primary-color bg-background-color ui-active:bg-gray-100 ui-not-disabled:hover:bg-gray-200 ui-not-disabled:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 ui-selected:mr-2 hidden data-[selected]:block ui-selected:block"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="cursor-default text-wrap ui-selected:font-semibold">{item.label || item.value || item.name}</p>
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
      </div>
    </Combobox>
  );
}
