import React from "react";
import { Row } from "../Layout/rows";

export default function SearchRounded({ id = "search", className = "", onChange, placeholder = "Rechercher...", showIcon = true }) {
  return (
    <Row className={"search-bar px-6 space-x-5 rounded-full border transition-colors border-text-light w-full max-w-sm " + className}>
      {showIcon && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      )}
      <input
        type="search"
        placeholder={placeholder}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        className="peer bg-transparent h-full py-4 flex-grow placeholder:italic placeholder-text-light text-text-color placeholder-opacity-50 focus:outline-none"
      />
    </Row>
  );
}
