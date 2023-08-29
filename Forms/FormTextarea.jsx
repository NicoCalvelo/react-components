import React from "react";
export default function FormTextarea({
  className = "",
  minLength = undefined,
  maxLength = undefined,
  value,
  setValue,
  required = false,
  title = null,
  placeholder = "",
  id,
  rows = undefined,
}) {
  return (
    <div className="block">
      {title && (
        <>
          <label className="font-semibold tracking-wider mb-1" htmlFor={id}>
            {title}
          </label>
          <br />
        </>
      )}
      <textarea
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        className={
          "border border-text-color placeholder:text-text-light w-full bg-transparent px-4 py-2 rounded-lg focus:outline-0 focus:ring-1" +
          className
        }
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
