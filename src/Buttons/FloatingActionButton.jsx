import React from "react";

export default function FloatingActionButton({ className = "", tooltip, onClick, ...props }) {
  if (!className.includes("bg-"))
    className =
      "bg-secondary-light text-secondary-dark hover:bg-secondary-color hover:text-secondary-on dark:bg-secondary-dark dark:text-secondary-light hover:dark:bg-secondary-color hover:dark:text-secondary-on " +
      className;

  return (
    <div className={"group fixed z-20 right-4 bottom-4"}>
      <button
        className={`btn duration-300 shadow-lg dark:shadow-dark-text-color/20 rounded-2xl xl:rounded-3xl p-4 md:p-5 xl:p-6 ${className}`}
        onClick={onClick}
        {...props}
      >
        {props.children}
      </button>
      {tooltip && (
        <div className="bg-black bg-opacity-60 pointer-events-none opacity-0 group-hover:opacity-100 absolute right-5 -top-4 transition-all duration-100 group-hover:delay-1000 rounded px-4 py-1">
          <p className="truncate text-sm text-white font-bold">{tooltip}</p>
        </div>
      )}
    </div>
  );
}
