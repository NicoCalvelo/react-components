import React from "react";

export default function OutlinedCard({ className = "", onClick, ...props }) {
  return (
    <div {...props} onClick={onClick} className={"card border border-current " + className}>
      {props.children}
    </div>
  );
}
