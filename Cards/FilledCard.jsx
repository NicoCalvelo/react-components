import React from 'react';

export default function FilledCard({ className = "", ...props }) {
  return <div className={"card bg-primary-dark dark:bg-primary-light text-primary-on " + className}>{props.children}</div>;
}
