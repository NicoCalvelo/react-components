import React from "react";

export default function OutlinedCard({ className = "", onClick, disabled, ...props }) {
  // on ajoute des styles si la card est désactivée
  if (disabled === true) {
    className += " cursor-default pointer-events-none opacity-50";
  }

  // on ajoute des styles si la card est cliquable
  if (onClick !== undefined && !className.includes("cursor-pointer")) {
    className += " cursor-pointer hover:shadow-inner transition-shadow duration-200";
  }

  return (
    <article {...props} onClick={onClick} className={"card rounded-xl border border-current " + className}>
      {props.children}
    </article>
  );
}
