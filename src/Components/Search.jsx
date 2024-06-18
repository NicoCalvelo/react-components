import React from "react";
import { Row } from "../Layout/Rows";

export default function SearchBar({ id = "search", className = "", onChange, placeholder = "Rechercher...", showIcon = true }) {
  return (
    <Row className={"search-bar relative pl-14 pr-6 space-x-5 rounded-full border transition-colors border-text-light w-full max-w-sm " + className}>
      <input
        type="search"
        placeholder={placeholder}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        className="peer bg-transparent h-full py-4 flex-grow placeholder:italic placeholder-text-light text-text-color placeholder-opacity-50 focus:outline-none"
      />
      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 stroke-1.5 peer-focus:stroke-2 transition-all absolute left-0"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      )}
    </Row>
  );
}

// TODO : Remember to add <mark> style in index.css
export function getHighlightedText(text, highlight) {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? <mark key={i}>{part}</mark> : part
  );
}