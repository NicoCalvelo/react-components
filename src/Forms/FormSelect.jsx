import React, { useState, useCallback, useMemo, useRef } from "react";
import { Column } from "../Layout/Columns";
import Spinner from "../Components/Spinner";

export const FormSelectVariant = Object.freeze({
  FILLED: "filled",
  OUTLINED: "outlined",
});

export default function FormSelect({
  className = "",
  variant = FormSelectVariant.FILLED,
  loading = false,
  options,
  allowEmpty = false,
  isMulti = false,
  required = false,
  value,
  defaultValue,
  onChange,
  title = null,
  placeholder = "",
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
  const selectRef = useRef(null);

  // ID unique pour le select
  const selectId = useMemo(() => {
    return id || `select-${Math.random().toString(36).substring(2, 11)}`;
  }, [id]);

  // ID pour les éléments associés
  const helperId = useMemo(() => `${selectId}-helper`, [selectId]);

  // Validation des options
  const validOptions = useMemo(() => {
    if (!options || !Array.isArray(options)) {
      console.warn('FormSelect: options should be an array');
      return [];
    }
    return options.filter(option => option && typeof option === 'object');
  }, [options]);

  // Vérification si une valeur est sélectionnée
  const hasSelection = useMemo(() => {
    return value !== undefined && value !== null && value !== '';
  }, [value]);

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

  // Gestion des erreurs personnalisées
  const handleInvalid = useCallback((e) => {
    if (errorMessage) {
      e.target.setCustomValidity(errorMessage);
      setCurrentError(errorMessage);
    }
  }, [errorMessage]);

  // Gestion du changement avec validation
  const handleChange = useCallback((e) => {
    // Réinitialiser les erreurs
    setCurrentError(null);
    e.target.setCustomValidity("");

    // Retirer le style placeholder si une valeur est sélectionnée
    if (e.target.classList.contains("!text-gray-400")) {
      e.target.classList.remove("!text-gray-400");
    }

    // Appel du callback parent
    if (onChange) {
      try {
        onChange(e);
      } catch (error) {
        console.error('Error in FormSelect onChange callback:', error);
        setCurrentError("Erreur lors de la sélection");
      }
    }
  }, [onChange]);

  // Classes CSS avec gestion d'erreur
  const selectClasses = useMemo(() => {
    let classes = `input peer !pr-16 ${getInputStyle(variant, title != null)}`;
    if (placeholder !== "" && !defaultValue && !hasSelection) {
      classes += " !text-gray-400";
    }
    if (currentError) {
      classes += " !ring-error-color";
    }
    return `${classes} ${className}`;
  }, [variant, title, placeholder, defaultValue, hasSelection, currentError, className]);

  // Message d'aide/erreur à afficher
  const helperMessage = useMemo(() => {
    if (currentError || errorMessage) return currentError || errorMessage;
    return supportingText;
  }, [currentError, errorMessage, supportingText]);

  // Détermine si on affiche un message d'erreur
  const hasError = Boolean(currentError || errorMessage);

  return (
    <Column className={`relative group ${getGroupStyle(variant, disabled)}`}>
      {title && (
        <label
          className={
            `absolute pointer-events-none transition-colors text-xs truncate ${getTitleStyle(variant)} ` +
            (isFocus ? "text-primary-color font-medium" : "text-text-light") +
            (required ? " after:content-['*'] after:text-red-500 after:ml-1" : "")
          }
          htmlFor={selectId}
        >
          {title}
        </label>
      )}
      
      {!loading && (
        <select
          {...props}
          ref={selectRef}
          id={selectId}
          title={disabled && messageDisabled ? messageDisabled : title}
          multiple={isMulti}
          required={required}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={selectClasses}
          onInvalid={handleInvalid}
          type={type}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          aria-describedby={helperMessage ? helperId : undefined}
          aria-invalid={hasError}
          name={props.name}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {allowEmpty && <option value="">-- Aucun --</option>}
          {validOptions.map((option, k) => (
            <option 
              key={option.key || `option_${k}`} 
              value={option.value} 
              disabled={option.disabled}
              className={`text-text-color ${option["bg-color"] || ""}`}
            >
              {option.label}
            </option>
          ))}
        </select>
      )}
      
      {loading && (
        <div className="w-36 h-12 mt-0.5 border-b border-gray-300" role="status" aria-label="Chargement des options">
          <Spinner className="h-5 w-5 absolute right-2 bottom-2" />
        </div>
      )}
      
      {/* Icône d'erreur */}
      {!isFocus && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`pointer-events-none text-sm absolute bottom-2 right-8 text-error-color w-5 h-5 transition-opacity ${
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
      
      {/* Icône de dropdown */}
      {!loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 absolute right-2 pointer-events-none transition-colors ${
            title ? "bottom-2.5" : "bottom-3"
          } ${disabled ? "text-gray-400" : "text-gray-600"}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      
      {/* Message d'aide/erreur */}
      {helperMessage && (
        <small 
          id={helperId}
          className={`absolute left-1 -bottom-5 text-xs ${
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
  if (variant === FormSelectVariant.FILLED) {
    return " bg-background-dark rounded " + (disabled ? "opacity-50" : "");
  } else if (variant === FormSelectVariant.OUTLINED) {
    return "" + (disabled ? "opacity-50" : "");
  }
}

function getTitleStyle(variant) {
  if (variant === FormSelectVariant.FILLED) {
    return " top-1.5 left-2 leading-none ";
  } else if (variant === FormSelectVariant.OUTLINED) {
    return " -top-2 left-2 px-2 bg-background-color ";
  }
}

function getInputStyle(variant, hasTitle) {
  if (variant === FormSelectVariant.FILLED) {
    return " border-b rounded focus:border pl-4 pr-6 " + (hasTitle ? "pt-5 pb-1" : "py-2 !text-sm");
  } else if (variant === FormSelectVariant.OUTLINED) {
    return " rounded-lg border focus:outline-2 pl-4 pr-6 pt-3 pb-2.5  ";
  }
}
