import React from "react";

export default function FilledCard({ className = "", ...props }) {
  return (
    <div className={"card bg-background-dark " + className} {...props}>
      {props.children}
    </div>
  );
}
