import React from "react";

export default function IconButton({ className = "", type = "button", onClick, disabled = false, tooltip, ...props }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...props}
        className={"peer icon-btn hover:bg-opacity-75 " + className}
      >
        {props.children}
      </button>
      {tooltip && (
        <div className="bg-black bg-opacity-60 pointer-events-none opacity-0 peer-hover:opacity-100 absolute z-10 right-5 -top-4 transition-all duration-100 peer-hover:delay-1000 rounded px-4 py-1">
          <p className="truncate text-sm text-white font-bold">{tooltip}</p>
        </div>
      )}
    </div>
  );
}
