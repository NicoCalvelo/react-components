import React from "react";

export default function ElevatedCard({ className = "", onClick, disabled, ...props }) {
  // Add the disabled class if the disabled prop is true
  if (disabled === true) {
    className += " cursor-default pointer-events-none opacity-50";
  }
  // We play with the shadow classes to give the card a lifted effect
  if (onClick !== undefined) {
    className += " cursor-pointer hover:shadow-lg hover:dark:shadow-light-lg transition-shadow duration-200";
  }

  return (
    <article
      {...props}
      onClick={onClick}
      className={"card shadow dark:shadow-light bg-secondary-light dark:bg-secondary-dark " + className}
    >
      {props.children}
    </article>
  );
}
