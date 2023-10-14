import React from "react";
import { Row } from "../Layout/rows";
import { Column } from "../Layout/columns";
import Spinner from "../Components/Spinner";
export default function FormSelect({
  className = "",
  loading = false,
  options,
  allowEmpty = false,
  isMulti = false,
  required = false,
  defaultValue,
  onChange,
  title = null,
  placeholder = "",
  errorMessage,
  id,
  type,
  ...props
}) {
  return (
    <Column className={"flex-grow relative"}>
      {title && (
        <label className="text-sm truncate" htmlFor={id}>
          {title} {required ? <></> : <span className="font-normal text-xs">(facultatif)</span>}
        </label>
      )}
      {errorMessage != undefined && (
        <span className="absolute text-error-color opacity-0 transition-opacity text-xs left-4 -bottom-5" htmlFor={id}>
          {errorMessage}
        </span>
      )}
      <Row>
        <select
          id={id}
          {...props}
          multiple={isMulti}
          required={required}
          className={
            "peer bg-background-dark border-text-color flex-grow focus:border-secondary-color placeholder:text-test-light border-b focus:border pl-4 pr-8 py-2 focus:outline-0 focus:ring-1 " +
            +" " +
            (loading ? "" : "invalid:border-error-color") +
            " " +
            className
          }
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue ? defaultValue : allowEmpty ? "" : undefined}
        >
          {allowEmpty && <option disabled value=""></option>}
          {options?.map((option, k) => (
            <option key={"option_" + k} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {loading && <Spinner className="w-4 h-4 absolute right-8" />}
        {!loading && <i className="fi fi-ss-exclamation text-sm opacity-0 peer-invalid:opacity-100 absolute right-8 text-error-color" />}
      </Row>
    </Column>
  );
}
