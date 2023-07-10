import React from "react";
export default function FormSelect({
  className = "",
  options,
  isMulti = false,
  required = false,
  value,
  setValue,
  title = null,
  placeholder = "",
  id,
  type,
}) {
  return (
    <>
      {title && (
        <label className="" htmlFor={id}>
          {title}
        </label>
      )}
      <select
        id={id}
        multiple={isMulti}
        required={required}
        className={"" + className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </>
  );
}
