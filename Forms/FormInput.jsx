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
  disabled = false,
  messageDisabled,
  id,
  type,
  ...props
}) {
  return (
    <Column className="flex-grow relative space-y-0.5">
      {title && (
        <label className="text-sm pr-5 truncate" htmlFor={id}>
          {title} {required || disabled ? <></> : <span className="font-normal text-xs">(facultatif)</span>}
        </label>
      )}
      {(errorMessage != undefined || messageDisabled != undefined) && (
        <span className={"opacity-0 text-xs ml-4 order-2 " + (errorMessage ? "text-error-color" : "text-gray-500")} htmlFor={id}>
          {errorMessage ? errorMessage : messageDisabled}
        </span>
      )}
      <Row className="order-1">
        <input
          {...props}
          id={id}
          minLength={minLength}
          defaultValue={defaultValue}
          maxLength={maxLength}
          pattern={pattern}
          disabled={disabled}
          className={
            "peer bg-background-dark border-text-color focus:border-secondary-color disabled:opacity-50 invalid:border-error-color placeholder:text-test-light border-b  w-full focus:border pl-4 pr-6 py-2 focus:outline-0 focus:ring-1 " +
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
        <i className={"fi fi-ss-exclamation text-sm opacity-0 peer-invalid:opacity-100 absolute right-2 text-error-color"} />
      </Row>
    </Column>
  );
}
