import React from 'react';

export default function FilledCard({ className = "", ...props }) {
  return <div className={"card bg-background-color dark:bg-dark-background-color " + className}>{props.children}</div>;
}
