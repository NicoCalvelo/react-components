import React from "react";
export default function Form({ className = "", id, onSubmit, ...props }) {
  return (
    <form
      id={id}
      className={"" + className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {props.children}
    </form>
  );
}
