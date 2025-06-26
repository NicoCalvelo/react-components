import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Column } from "../Layout/Columns";

export const TextareaVariant = Object.freeze({
  FILLED: "filled",
  OUTLINED: "outlined",
});

export default function FormTextarea({
  variant = TextareaVariant.FILLED,
  minLength = undefined,
  maxLength = undefined,
  className = "",
  value,
  setValue,
  title = null,
  required = false,
  defaultValue,
  placeholder = "",
  pattern = undefined,
  errorMessage,
  supportingText,
  disabled = false,
  messageDisabled,
  resizable = true,
  autoResize = false,
  rows,
  id,
  type,
  ...props
}) {
  const [isFocus, setFocus] = useState(false);
  const [currentError, setCurrentError] = useState(null);
  const textareaRef = useRef(null);
  const maxLengthRef = useRef(null);

  // ID unique pour le textarea
  const textareaId = useMemo(() => {
    return id || `textarea-${Math.random().toString(36).substring(2, 11)}`;
  }, [id]);

  // ID pour les éléments associés
  const helperId = useMemo(() => `${textareaId}-helper`, [textareaId]);

  // Validation du maxLength
  const isOverMaxLength = useMemo(() => {
    if (!maxLength) return false;
    const currentValue = value || defaultValue || '';
    return currentValue.length > maxLength;
  }, [maxLength, value, defaultValue]);

  // Fonction de redimensionnement optimisée
  const resizeElement = useCallback((e) => {
    if (!e.target) return;
    try {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + 5 + "px";
    } catch (error) {
      console.error('Error resizing textarea:', error);
    }
  }, []);

  // Auto-resize au montage si nécessaire
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      resizeElement({ target: textareaRef.current });
    }
  }, [autoResize, resizeElement]);

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
    const newValue = e.target.value;
    
    // Réinitialiser les erreurs
    setCurrentError(null);
    
    // Validation maxLength
    if (maxLength) {
      if (newValue.length > maxLength) {
        const errorMsg = `Le texte ne peut pas dépasser ${maxLength} caractères.`;
        e.target.setCustomValidity(errorMsg);
        setCurrentError(errorMsg);
        
        // Style d'erreur via ref au lieu de DOM
        if (maxLengthRef.current) {
          maxLengthRef.current.classList.add("text-error-color");
        }
        if (textareaRef.current) {
          textareaRef.current.classList.add("!ring-error-color");
        }
      } else {
        e.target.setCustomValidity("");
        
        // Retirer le style d'erreur
        if (maxLengthRef.current && maxLengthRef.current.classList.contains("text-error-color")) {
          maxLengthRef.current.classList.remove("text-error-color");
        }
        if (textareaRef.current) {
          textareaRef.current.classList.remove("!ring-error-color");
        }
      }
    }

    // Auto-resize si activé
    if (autoResize) {
      resizeElement(e);
    }
    
    // Appel du callback parent
    if (setValue) {
      try {
        setValue(e);
      } catch (error) {
        console.error('Error in FormTextarea setValue callback:', error);
      }
    }
  }, [maxLength, autoResize, resizeElement, setValue]);

  // Classes CSS avec gestion d'erreur
  const textareaClasses = useMemo(() => {
    let classes = `input peer !pr-20 !pb-5 ${getInputStyle(variant)}`;
    if (currentError || isOverMaxLength) classes += " !ring-error-color";
    return classes;
  }, [variant, currentError, isOverMaxLength]);

  // Message d'aide/erreur à afficher
  const helperMessage = useMemo(() => {
    if (currentError || errorMessage) return currentError || errorMessage;
    return supportingText;
  }, [currentError, errorMessage, supportingText]);

  // Détermine si on affiche un message d'erreur
  const hasError = Boolean(currentError || errorMessage || isOverMaxLength);

  return (
    <Column className={`relative group ${getGroupStyle(variant, disabled)} ${className}`}>
      {title && (
        <label
          className={
            `absolute pointer-events-none transition-colors text-sm truncate ${getTitleStyle(variant)} ` +
            (isFocus ? "text-text-light font-medium" : "text-text-light") +
            (required ? " after:content-['*'] after:text-red-500 after:ml-1" : "")
          }
          htmlFor={textareaId}
        >
          {title}
        </label>
      )}
      <textarea
        {...props}
        ref={textareaRef}
        id={textareaId}
        minLength={minLength}
        maxLength={maxLength ? maxLength : undefined}
        title={disabled && messageDisabled ? messageDisabled : title}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={textareaClasses}
        style={{ resize: resizable ? "both" : "none" }}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onInvalid={handleInvalid}
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
          className={`pointer-events-none text-sm absolute bottom-1.5 right-1 text-error-color w-5 h-5 transition-opacity ${
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
          className={`absolute font-semibold bottom-1.5 right-2 transition-colors ${
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
  if (variant === TextareaVariant.FILLED) {
    return " bg-background-dark rounded-t-lg " + (disabled ? "opacity-50" : "");
  } else if (variant === TextareaVariant.OUTLINED) {
    return "" + (disabled ? "opacity-50" : "");
  }
}

function getInputStyle(variant) {
  if (variant === TextareaVariant.FILLED) {
    return " border-b focus:border pl-4 pr-6 pt-5 pb-1  ";
  } else if (variant === TextareaVariant.OUTLINED) {
    return " rounded-lg border focus:outline-text-light focus:border-2 pl-4 pr-6 pt-4 pb-2.5  ";
  }
}

function getTitleStyle(variant) {
  if (variant === TextareaVariant.FILLED) {
    return " top-1.5 left-2 leading-none ";
  } else if (variant === TextareaVariant.OUTLINED) {
    return " -top-2.5 left-2 px-2 bg-background-color ";
  }
}
