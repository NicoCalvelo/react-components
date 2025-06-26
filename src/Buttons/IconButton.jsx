import React from "react";

export default function IconButton({ className = "", type = "button", onClick, disabled = false, tooltip, ...props }) {
  return (
    <div className="relative inline-block">
      <button onClick={onClick} disabled={disabled} type={type} {...props} className={`peer icon-btn ${className}`}>
        {props.children}
      </button>
      {tooltip && (
        <div className="bg-black bg-opacity-60 pointer-events-none opacity-0 peer-hover:opacity-100 origin-right z-20 absolute -translate-x-full -translate-y-14 transition-all duration-100 peer-hover:delay-1000 rounded px-4 py-1">
          <p className="truncate text-sm text-white font-bold">{tooltip}</p>
        </div>
      )}
    </div>
  );
}

export function OutlinedIconButton({ className = "", type = "button", onClick, disable = false, tooltip, ...props }) {
  return (
    <IconButton
      className="border text-secondary-dark border-secondary-color hover:bg-text-light hover:bg-opacity-10"
      type={type}
      onClick={onClick}
      disabled={disable}
      tooltip={tooltip}
      {...props}
    />
  );
}

export function FilledIconButton({ className = "", type = "button", onClick, disable = false, tooltip, ...props }) {
  return (
    <IconButton
      className="bg-secondary-color hover:bg-opacity-75 text-secondary-on"
      type={type}
      onClick={onClick}
      disabled={disable}
      tooltip={tooltip}
      {...props}
    />
  );
}
