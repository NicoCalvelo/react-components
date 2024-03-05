import React from "react";

export default function OutlinedCard({ className = "", onClick, ...props }) {
  return (
    <div {...props} onClick={onClick} className={"card rounded border border-current " + className}>
      {props.children}
    </div>
  );
}
