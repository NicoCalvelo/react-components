import React from 'react';

export default function ElevatedCard({ className = "", onClick, ...props }) {
  return (
    <div onClick={onClick} className={"card shadow-lg bg-background-color dark:bg-dark-background-color " + className}>
      {props.children}
    </div>
  );
}
