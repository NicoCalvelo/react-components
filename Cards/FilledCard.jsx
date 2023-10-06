import React from 'react';

export default function FilledCard({ className = "", ...props }) {
  return <div className={"card bg-background-color " + className}>{props.children}</div>;
}
