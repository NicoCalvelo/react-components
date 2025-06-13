import React from "react";

export default function ElevatedCard({ className = "", onClick, disabled, ...props }) {
  // on ajoute des styles si la card est désactivée
  if (disabled === true) {
    className += " cursor-default pointer-events-none opacity-50";
  }

  // on ajoute des styles si la card est cliquable
  if (onClick !== undefined && !className.includes("cursor-pointer")) {
    className += " cursor-pointer hover:shadow-lg transition-shadow duration-200";
  }

  return (
    <article {...props} onClick={onClick} className={"card shadow bg-background-color " + className}>
      {props.children}
    </article>
  );
}
