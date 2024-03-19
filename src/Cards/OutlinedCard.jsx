import React from "react";

export default function OutlinedCard({ className = "", onClick, disabled, ...props }) {
  // Add the disabled class if the disabled prop is true
  if (disabled === true) {
    className += " cursor-default pointer-events-none opacity-50";
  }
  // We play whith the background classes to give the card a lifted effect
  if (onClick !== undefined) {
    className += " cursor-pointer hover:bg-primary-color hover:bg-opacity-5 transition-colors duration-200";
  }

  return (
    <article {...props} onClick={onClick} className={"card rounded border border-current " + className}>
      {props.children}
    </article>
  );
}
