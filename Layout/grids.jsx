import React from "react";

export function GridCols4({ className = "", ...props }) {
  return (
    <div {...props} className={"grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-5 " + className}>
      {props.children}
    </div>
  );
}

export function GridCols3({ className = "", ...props }) {
  return (
    <div {...props} className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 2xl:gap-5 " + className}>
      {props.children}
    </div>
  );
}

export function GridCols2({ className = "", ...props }) {
  return (
    <div {...props} className={"grid md:grid-cols-2 gap-3 " + className}>
      {props.children}
    </div>
  );
}
