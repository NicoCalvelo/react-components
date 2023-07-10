import React from "react";

export default function IconButton({ className = "", type = "button", onClick, disable = false, tooltip, ...props }) {
  return (
    <div className="group relative">
      <button
        onClick={onClick}
        disabled={disable}
        type={type}
        {...props}
        className={"icon-btn bg-background-dark dark:bg-dark-background-light bg-opacity-0 hover:bg-opacity-10 " + className}
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
