import React from "react";
import { Column } from "../Layout/columns";
import { Row } from "../Layout/rows";
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
  errorMessage,
  id,
  type,
  ...props
}) {
  return (
    <Column className="flex-grow relative">
      {title && (
        <label className="text-sm pr-5 truncate" htmlFor={id}>
          {title} {required ? <></> : <span className="font-normal text-xs">(facultatif)</span>}
        </label>
      )}
      {errorMessage != undefined && (
        <span className="absolute opacity-0 text-error-color text-xs left-4 -bottom-5" htmlFor={id}>
          {errorMessage}
        </span>
      )}
      <Row>
        <input
          {...props}
          id={id}
          minLength={minLength}
          defaultValue={defaultValue}
          maxLength={maxLength}
          pattern={pattern}
          className={
            "peer bg-background-dark border-text-color focus:border-secondary-color invalid:border-error-color placeholder:text-test-light border-b  w-full focus:border pl-4 pr-8 py-2.5 focus:outline-0 focus:ring-1 " +
            className +
            (type == "file"
              ? " relative file:bg-primary-color file:text-primary-on file:text-sm file:font-semibold file:m-0 file:border-0 file:absolute file:cursor-pointer file:right-10 file:top-0.5 file:px-4 file:py-2.5"
              : "")
          }
          type={type}
          required={required}
          autoComplete={"password"}
          placeholder={placeholder}
          value={value}
          onChange={setValue}
        />
        <i className={"fi fi-ss-exclamation text-sm opacity-0 peer-invalid:opacity-100 relative -left-6 text-error-color"} />
      </Row>
    </Column>
  );
}
