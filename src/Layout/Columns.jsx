import React from "react";

export function Column({ className = "", ...props }) {
  return (
    <div {...props} className={`flex flex-col ${className}`}>
      {props.children}
    </div>
  );
}

export function ColumnCenter({ className = "", ...props }) {
  className = className.includes("items-") ? className : `${className} items-center`;
  return (
    <div {...props} className={`flex flex-col justify-center h-full ${className}`}>
      {props.children}
    </div>
  );
}

export function ColumnEnd({ className = "", ...props }) {
  className = className.includes("items-") ? className : `${className} items-end`;
  return (
    <div {...props} className={`flex flex-col h-full justify-end ${className}`}>
      {props.children}
    </div>
  );
}

export function ColumnBetween({ className = "", ...props }) {
  className = className.includes("items-") ? className : `${className} items-center`;
  return (
    <div {...props} className={`flex flex-col h-full justify-between ${className}`}>
      {props.children}
    </div>
  );
}

export function ColRow({ className = "", breakpoint = "lg:flex-row", ...props }) {
  return (
    <div {...props} className={`flex flex-col ${breakpoint} ${className}`}>
      {props.children}
    </div>
  );
}
