import React from "react";
export default function Form({ className = "", id, onSubmit, method, action, ...props }) {
  return (
    <form id={id} className={"" + className} onSubmit={onSubmit} method={method} action={action}>
      {props.children}
    </form>
  );
}
