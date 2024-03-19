import React from "react";

export default function FilledCard({ className = "", onClick, disabled, ...props }) {
  // Add the disabled class if the disabled prop is true
  if (disabled === true) {
    className += " cursor-default pointer-events-none opacity-50";
  }
  // We play whith the background opacity to give the card a lifted effect
  if (onClick !== undefined) {
    className += " cursor-pointer hover:bg-opacity-75 hover:dark:bg-opacity-75 transition-opacity duration-200";
  }

  return (
    <article
      {...props}
      onClick={onClick}
      className={"card bg-background-color dark:bg-dark-background-color " + className}
    >
      {props.children}
    </article>
  );
}
