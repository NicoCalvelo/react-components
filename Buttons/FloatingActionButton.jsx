import React from "react";

export default function FloatingActionButton({ className = "", tooltip, type = "button", onClick, ...props }) {
  return (
    <div className={"group fixed z-20 right-4 bottom-4 " + className}>
      <button
        onClick={onClick}
        type={type}
        {...props}
        className={
          "btn shadow-lg rounded-2xl xl:rounded-3xl p-3 md:p-4 xl:p-5 bg-secondary-light text-secondary-dark dark:bg-secondary-dark dark:text-secondary-on"
        }
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
