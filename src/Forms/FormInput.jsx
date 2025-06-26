import React, { useState, useCallback, useMemo, useRef } from "react";
import { Column } from "../Layout/Columns";

export const FormInputVariant = Object.freeze({
  FILLED: "filled",
  OUTLINED: "outlined",
});

export default function FormInput({
  variant = FormInputVariant.FILLED,
  minLength = undefined,
  maxLength = undefined,
  className = "",
  value,
  setValue,
  title = null,
  required = false,
  defaultValue,
  placeholder,
  pattern = undefined,
  errorMessage,
  supportingText,
  disabled = false,
  messageDisabled,
  id,
  type,
  ...props
}) {
  const [isFocus, setFocus] = useState(false);
  const [currentError, setCurrentError] = useState(null);
  const inputRef = useRef(null);
  const maxLengthRef = useRef(null);

  // ID unique pour l'input
  const inputId = useMemo(() => {
    return id || `input-${Math.random().toString(36).substring(2, 11)}`;
  }, [id]);

  // ID pour les éléments associés
  const helperId = useMemo(() => `${inputId}-helper`, [inputId]);
  const errorId = useMemo(() => `${inputId}-error`, [inputId]);

  // Validation du maxLength
  const isOverMaxLength = useMemo(() => {
    if (!maxLength) return false;
    const currentValue = value || defaultValue || '';
    return currentValue.length > maxLength;
  }, [maxLength, value, defaultValue]);

  // Gestion du focus avec callback optimisé
  const handleFocus = useCallback((e) => {
    setFocus(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  }, [props.onFocus]);

  const handleBlur = useCallback((e) => {
    setFocus(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  }, [props.onBlur]);

  // Gestion du clic avec callback optimisé
  const handleClick = useCallback((e) => {
    if (props.onClick) {
      props.onClick(e);
    }
  }, [props.onClick]);

  // Gestion des erreurs personnalisées
  const handleInvalid = useCallback((e) => {
    if (errorMessage) {
      e.target.setCustomValidity(errorMessage);
      setCurrentError(errorMessage);
    }
  }, [errorMessage]);

  // Logique complexe pour les nombres décimaux
  const handleBeforeInput = useCallback((e) => {
    if (type === "number" && e.data === "." && !e.target.value.includes(",")) {
      e.preventDefault();
      e.target.value = e.target.value + ".0";
      e.target.type = "text";
      e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length);
      e.target.type = "number";
    }
  }, [type]);

  // Gestion du changement avec validation
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    
    // Réinitialiser les erreurs
    setCurrentError(null);
    
    // Validation maxLength
    if (maxLength) {
      if (newValue.length > maxLength) {
        const errorMsg = `Le champ ne peut pas dépasser ${maxLength} caractères.`;
        e.target.setCustomValidity(errorMsg);
        e.target.title = errorMsg;
        setCurrentError(errorMsg);
        
        // Style d'erreur via ref au lieu de DOM
        if (maxLengthRef.current) {
          maxLengthRef.current.classList.add("text-error-color");
        }
        if (inputRef.current) {
          inputRef.current.classList.add("!ring-error-color");
        }
      } else {
        e.target.setCustomValidity("");
        e.target.title = "";
        
        // Retirer le style d'erreur
        if (maxLengthRef.current && maxLengthRef.current.classList.contains("text-error-color")) {
          maxLengthRef.current.classList.remove("text-error-color");
        }
        if (inputRef.current) {
          inputRef.current.classList.remove("!ring-error-color");
        }
      }
    }
    
    // Appel du callback parent
    if (setValue && (type !== "number" || e.nativeEvent.data !== ".")) {
      try {
        setValue(e);
      } catch (error) {
        console.error('Error in FormInput setValue callback:', error);
      }
    }
  }, [maxLength, setValue, type]);

  // Classes CSS avec gestion d'erreur
  const inputClasses = useMemo(() => {
    let classes = `input !w-full peer text-text-color ${getInputStyle(variant, title !== null)}`;
    if (type === "file") classes += " file-input";
    if (currentError || isOverMaxLength) classes += " !ring-error-color";
    return classes;
  }, [variant, title, type, currentError, isOverMaxLength]);

  // Message d'aide/erreur à afficher
  const helperMessage = useMemo(() => {
    if (currentError || errorMessage) return currentError || errorMessage;
    return supportingText;
  }, [currentError, errorMessage, supportingText]);

  // Détermine si on affiche un message d'erreur
  const hasError = Boolean(currentError || errorMessage || isOverMaxLength);

  return (
    <Column className={`relative w-fit group ${getGroupStyle(variant, disabled)} ${className}`}>
      {title && (
        <label
          className={
            `absolute pointer-events-none transition-colors text-xs truncate ${getTitleStyle(variant)} ` +
            (isFocus ? "text-text-light font-medium" : "text-text-light") +
            (required ? " after:content-['*'] after:text-red-500 after:ml-1" : "")
          }
          htmlFor={inputId}
        >
          {title}
        </label>
      )}
      <input
        {...props}
        ref={inputRef}
        id={inputId}
        minLength={minLength}
        maxLength={maxLength ? maxLength : undefined}
        title={disabled && messageDisabled ? messageDisabled : title}
        defaultValue={defaultValue}
        pattern={pattern}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        className={inputClasses}
        type={type}
        onInvalid={handleInvalid}
        required={required}
        placeholder={placeholder}
        value={value}
        onBeforeInput={handleBeforeInput}
        onChange={handleChange}
        aria-describedby={helperMessage ? helperId : undefined}
        aria-invalid={hasError}
        name={props.name}
      />
      
      {/* Icône d'erreur */}
      {(!maxLength || !isFocus) && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`pointer-events-none text-sm absolute top-6 right-1 text-error-color w-5 h-5 transition-opacity ${
            hasError ? "opacity-100" : "opacity-0 peer-invalid:opacity-100"
          }`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      
      {/* Compteur de caractères */}
      {maxLength && isFocus && (
        <small 
          ref={maxLengthRef}
          className={`absolute font-semibold top-6 right-1.5 transition-colors ${
            isOverMaxLength ? "text-error-color" : "text-text-light"
          }`}
          aria-live="polite"
        >
          {value ? value.length : defaultValue ? defaultValue.length : `max ${maxLength}`}
        </small>
      )}
      
      {/* Message d'aide/erreur */}
      {helperMessage && (
        <small 
          id={helperId}
          className={`px-2 pt-1 text-xs ${
            hasError 
              ? "text-red-600 flex items-center" 
              : "text-text-light italic"
          }`}
          role={hasError ? "alert" : undefined}
          aria-live={hasError ? "polite" : undefined}
        >
          {hasError && (
            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {helperMessage}
        </small>
      )}
    </Column>
  );
}

function getGroupStyle(variant, disabled) {
  if (variant === FormInputVariant.FILLED) {
    return " bg-gray-100 rounded-t-lg";
  } else if (variant === FormInputVariant.OUTLINED) {
    return "";
  }
}

function getTitleStyle(variant) {
  if (variant === FormInputVariant.FILLED) {
    return " top-1 left-2 leading-none ";
  } else if (variant === FormInputVariant.OUTLINED) {
    return " -top-2.5 left-2 px-2 bg-background-color ";
  }
}

function getInputStyle(variant, hasTitle) {
  if (variant === FormInputVariant.FILLED) {
    return " focus:border-b pl-4 pr-6  " + (hasTitle ? "pt-5 pb-1" : " py-3");
  } else if (variant === FormInputVariant.OUTLINED) {
    return " rounded-lg border focus:outline-text-light focus:outline-2 pl-4 pr-6 " + (hasTitle ? "pt-3 pb-2.5" : "py-3");
  }
}
