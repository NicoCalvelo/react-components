import React from "react";

export default function FloatingActionButton({ className = "", hasIcon = false, tooltip, onClick, ...props }) {
  if (!className.includes("bg-"))
    className =
      "bg-primary-light text-black hover:bg-primary-color hover:text-primary-on " +
      className;

  return (
    <div className={"group fixed z-20 right-4 bottom-4"}>
      <button
        className={`btn items-center duration-300 shadow-lg font-bold rounded-2xl xl:rounded-3xl p-4 md:p-5 xl:p-6 ${className}` + (
          hasIcon ? " !pl-3 md:!pl-4 xl:!pl-5" : ""
        )}
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
