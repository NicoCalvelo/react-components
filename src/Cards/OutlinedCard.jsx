import React from "react";

export default function OutlinedCard({ className = "", onClick, disabled, ...props }) {
    // Add the disabled class if the disabled prop is true
    if (disabled === true) {
      className += " cursor-default pointer-events-none opacity-50";
    }

  return (
    <article {...props} onClick={onClick} className={"card rounded border border-current " + className}>
      {props.children}
    </article>
  );
}
