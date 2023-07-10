import React from "react";
export default function FormInput({
  className = "",
  minLength = undefined,
  maxLength = undefined,
  value,
  setValue,
  title = null,
  required = false,
  defaultValue,
  placeholder = "",
  pattern = undefined,
  id,
  type,
  ...props
}) {
  return (
    <>
      {title && (
        <>
          <label className="font-semibold tracking-wider" htmlFor={id}>
            {title} {required ? <></> : <span className="font-normal text-sm">(facultatif)</span>}
          </label>
          <br />
        </>
      )}
      <input
        {...props}
        id={id}
        minLength={minLength}
        defaultValue={defaultValue}
        maxLength={maxLength}
        pattern={pattern}
        className={"bg-transparent border-text-color placeholder:text-gray-400 border px-4 py-2 rounded-lg focus:outline-0 focus:ring-1 " + className}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      />
    </>
  );
}
