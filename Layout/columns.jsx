import React from "react";

export function Column({ className = "", id = undefined, ...props }) {
  return (
    <div {...props} id={id} className={"flex flex-col " + " " + className}>
      {props.children}
    </div>
  );
}

export function ColumnCenter({ className = "", id = undefined, ...props }) {
  return (
    <div {...props} id={id} className={"flex flex-col h-full justify-center items-center " + " " + className}>
      {props.children}
    </div>
  );
}

export function ColumnEnd({ className = "", id = undefined, ...props }) {
  return (
    <div {...props} id={id} className={"flex flex-col flex-grow justify-end items-end " + " " + className}>
      {props.children}
    </div>
  );
}

export function ExpandedColumn({ id = "", className = "", ...props }) {
  return (
    <div {...props} id={id} className={"flex flex-col h-full " + className}>
      {props.children}
    </div>
  );
}

export function ColRow({ className = "", breakPoint = "lg", ...props }) {
  return (
    <div {...props} className={"flex flex-col " + breakPoint + ":flex-row " + className}>
      {props.children}
    </div>
  );
}
