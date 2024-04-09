import React from "react";

export function Row({ className = "", ...props }) {
  if (!className.includes("items-")) className += " items-center ";
  return (
    <div {...props} className={"flex " + className}>
      {props.children}
    </div>
  );
}


export function RowCenter({ className = "", ...props }) {
  if (!className.includes("items-")) className += " items-center ";
  return (
    <div {...props} className={"flex justify-center " + className}>
      {props.children}
    </div>
  );
}

export function RowBetween({ className = "", ...props }) {
  if (!className.includes("items-")) className += " items-center ";
  return (
    <div {...props} className={"flex w-full justify-between " + className}>
      {props.children}
    </div>
  );
}

export function RowEnd({ className = "", ...props }) {
  if (!className.includes("items-")) className += " items-center ";
  return (
    <div {...props} className={"flex w-full justify-end " + className}>
      {props.children}
    </div>
  );
}