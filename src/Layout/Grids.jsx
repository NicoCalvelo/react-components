import React from "react";

export function GridCols4({ className = "", children, breakpoints = "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", ...props }) {
  return (
    <div className={`grid grid-cols-1 ${breakpoints} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function GridCols3({ className = "", children, breakpoints = "md:grid-cols-2 xl:grid-cols-3", ...props }) {
  return (
    <div className={`grid grid-cols-1 ${breakpoints} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function GridCols2({ className = "", children, breakpoints = "lg:grid-cols-2", ...props }) {
  return (
    <div className={`grid grid-cols-1 ${breakpoints} ${className}`} {...props}>
      {children}
    </div>
  );
}
