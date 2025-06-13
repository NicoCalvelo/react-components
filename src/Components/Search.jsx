import React from "react";
import { Row } from "../Layout/Rows";

export default function SearchBar({ id = "search", className = "", onChange, placeholder = "Rechercher...", showIcon = true, caseSensitive = false, ...props }) {
  return (
    <Row className={"search-bar has-[:focus]:shadow-inner relative pl-12 pr-6 space-x-5 rounded-full transition-colors border w-full max-w-sm " + className}>
      <input
        type="search"
        placeholder={placeholder}
        id={id}
        autoComplete="off"
        onChange={(e) => onChange(caseSensitive ? e.target.value : e.target.value.toLowerCase())}
        className="peer bg-transparent h-full py-4 flex-grow placeholder:italic placeholder-text-light focus:text-text-color placeholder-opacity-50 focus:outline-none"
      />
      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 stroke-1.5 peer-focus:stroke-2 transition-all text-gray-400 peer-focus:text-primary-color absolute -left-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      )}
      {props.children}
    </Row>
  );
}

export function getHighlightedText(text, highlight) {
  if (!highlight || !text) return text;
  // Split text on highlight term, include term itself into parts, ignore case
  const regex = new RegExp(`(${highlight})`, "gi");
  return text.split(regex).map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : part));
}
