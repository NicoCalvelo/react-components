import React from "react";

export default function FilledCard({ className = "", disabled, ...props }) {
  // Add the disabled class if the disabled prop is true
  if (disabled === true) {
    className += " cursor-default pointer-events-none opacity-50";
  }

  return (
    <article className={"card bg-background-color dark:bg-dark-background-color " + className}>
      {props.children}
    </article>
  );
}
