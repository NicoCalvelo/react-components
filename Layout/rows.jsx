import React from "react";

export function Row({ className = "", ...props }) {
  if (!className.includes("items-")) className += " items-center ";
  return <div  {...props} className={"flex " + className}>{props.children}</div>;
}

export function RowStart({ className = "", ...props }) {
  return <div  {...props} className={"flex items-start justify-start " + className}>{props.children}</div>;
}

export function RowCenter({ className = "", ...props }) {
  return <div  {...props} className={"flex items-center justify-center " + className}>{props.children}</div>;
}

export function RowBetween({ className = "", ...props }) {
  if (!className.includes("items-")) className += " items-center ";
  return <div {...props} className={"flex w-full justify-between " + className}>{props.children}</div>;
}

export function RowEnd({ className = "", ...props }) {
  return <div {...props} className={"flex items-center w-full justify-end " + className}>{props.children}</div>;
}

export function RowCol({ className = "", ...props }) {
  let css = "flex flex-row lg:flex-col";
  return <div {...props} className={css + " " + className}>{props.children}</div>;
}
