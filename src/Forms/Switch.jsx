import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";

export const SwitchVariant = Object.freeze({
  STANDARD: "standard",
  FILLED: "filled",
  OUTLINED: "outlined",
});

export const SwitchSize = Object.freeze({
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
});

export default function Switch({ 
  id, 
  className = "", 
  defaultActive = false, 
  value,
  setValue,
  onChange, 
  disabled = false, 
  label,
  variant = SwitchVariant.STANDARD,
  size = SwitchSize.MEDIUM,
  required = false,
  errorMessage,
  supportingText,
  name,
  onFocus,
  onBlur,
  ...props 
}) {
  const [active, setActive] = useState(defaultActive);
  
  // Support des patterns value/setValue ET defaultActive/onChange
  const currentValue = useMemo(() => {
    return value !== undefined ? value : active;
  }, [value, active]);

  const handleValueChange = useCallback((newValue) => {
    if (value === undefined) {
      setActive(newValue);
    }
    
    // Appel des callbacks
    if (setValue) {
      try {
        setValue(newValue);
      } catch (error) {
        console.error('Error in Switch setValue callback:', error);
      }
    }
    
    if (onChange) {
      try {
        onChange(newValue);
      } catch (error) {
        console.error('Error in Switch onChange callback:', error);
      }
    }
  }, [setValue, onChange, value]);

  return (
    <ControlledSwitch
      id={id}
      className={className}
      active={currentValue}
      disabled={disabled}
      label={label}
      variant={variant}
      size={size}
      required={required}
      errorMessage={errorMessage}
      supportingText={supportingText}
      name={name}
      onFocus={onFocus}
      onBlur={onBlur}
      setActive={handleValueChange}
      {...props}
    />
  );
}

export function ControlledSwitch({ 
  id, 
  className = "", 
  active, 
  setActive, 
  disabled = false, 
  label,
  variant = SwitchVariant.STANDARD,
  size = SwitchSize.MEDIUM,
  required = false,
  errorMessage,
  supportingText,
  name,
  onFocus,
  onBlur,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [currentError, setCurrentError] = useState(null);
  const switchRef = useRef(null);
  const inputRef = useRef(null);

  // ID unique pour le composant
  const switchId = useMemo(() => {
    return id || `switch-${Math.random().toString(36).substring(2, 11)}`;
  }, [id]);

  // IDs pour les éléments associés
  const helperId = useMemo(() => `${switchId}-helper`, [switchId]);
  const errorId = useMemo(() => `${switchId}-error`, [switchId]);

  // Gestion des événements
  const handleToggle = useCallback((event) => {
    if (disabled) return;
    
    event.stopPropagation();
    setCurrentError(null);
    
    const newValue = !active;
    
    // Validation required
    if (required && !newValue) {
      const errorMsg = "Ce champ est requis.";
      setCurrentError(errorMsg);
    }
    
    // Mise à jour de l'input hidden
    if (inputRef.current) {
      inputRef.current.checked = newValue;
    }
    
    setActive(newValue);
  }, [active, setActive, disabled, required]);

  const handleKeyDown = useCallback((event) => {
    if (disabled) return;
    
    // Support clavier : Space ou Enter pour toggle
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggle(event);
    }
  }, [handleToggle, disabled]);

  const handleFocus = useCallback((event) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  }, [onFocus]);

  const handleBlur = useCallback((event) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  }, [onBlur]);

  const handleLabelClick = useCallback((event) => {
    event.preventDefault();
    if (!disabled && switchRef.current) {
      switchRef.current.focus();
      handleToggle(event);
    }
  }, [handleToggle, disabled]);

  // Messages d'aide/erreur
  const helperMessage = useMemo(() => {
    if (currentError || errorMessage) return currentError || errorMessage;
    return supportingText;
  }, [currentError, errorMessage, supportingText]);

  const hasError = Boolean(currentError || errorMessage);

  // Classes CSS basées sur la variante et la taille
  const getSwitchClasses = useCallback(() => {
    let baseClasses = "relative transition-all duration-300 ease-out border flex items-center rounded-full";
    
    // Taille
    switch (size) {
      case SwitchSize.SMALL:
        baseClasses += " w-8 h-4 px-0.5";
        break;
      case SwitchSize.LARGE:
        baseClasses += " w-16 h-8 px-1.5";
        break;
      default: // MEDIUM
        baseClasses += " w-12 h-6 px-1";
    }

    // Position du curseur
    baseClasses += active ? " justify-end" : " justify-start";

    // Variante et état
    switch (variant) {
      case SwitchVariant.FILLED:
        if (active) {
          baseClasses += " bg-primary-color border-primary-color";
        } else {
          baseClasses += " bg-gray-200 border-gray-200";
        }
        break;
      case SwitchVariant.OUTLINED:
        baseClasses += " bg-transparent";
        if (active) {
          baseClasses += " border-primary-color";
        } else {
          baseClasses += " border-gray-400";
        }
        break;
      default: // STANDARD
        if (active) {
          baseClasses += " border-primary-color bg-primary-color";
        } else {
          baseClasses += " border-gray-400 bg-gray-100";
        }
    }

    // États focus et erreur
    if (isFocused) {
      baseClasses += " ring-2 ring-primary-color ring-opacity-50";
    }
    if (hasError) {
      baseClasses += " !border-red-500 !ring-red-500";
    }

    // État disabled
    if (disabled) {
      baseClasses += " opacity-50 cursor-not-allowed";
    } else {
      baseClasses += " cursor-pointer";
    }

    return baseClasses;
  }, [variant, size, active, isFocused, hasError, disabled]);

  const getThumbClasses = useCallback(() => {
    let baseClasses = "transition-all duration-200 ease-out rounded-full flex-shrink-0";
    
    // Taille du thumb
    switch (size) {
      case SwitchSize.SMALL:
        baseClasses += " w-3 h-3";
        break;
      case SwitchSize.LARGE:
        baseClasses += " w-6 h-6";
        break;
      default: // MEDIUM
        baseClasses += " w-4 h-4";
    }

    // Couleur du thumb
    if (props.children === undefined) {
      if (active) {
        baseClasses += " bg-white shadow-sm";
      } else {
        baseClasses += " bg-gray-400";
      }
    }

    return baseClasses;
  }, [size, active, props.children]);

  const getLabelClasses = useCallback(() => {
    let baseClasses = "text-sm cursor-pointer select-none";
    
    if (hasError) {
      baseClasses += " text-red-600";
    } else {
      baseClasses += " text-text-light";
    }
    
    if (required) {
      baseClasses += " after:content-['*'] after:text-red-500 after:ml-1";
    }
    
    if (disabled) {
      baseClasses += " opacity-50 cursor-not-allowed";
    }

    return baseClasses;
  }, [hasError, required, disabled]);

  // Validation des props
  if (active === undefined || setActive === undefined) {
    console.error("ControlledSwitch: You must provide active and setActive props");
    return null;
  }
  if (typeof active !== "boolean") {
    console.error("ControlledSwitch: The active prop must be a boolean");
    return null;
  }
  if (typeof setActive !== "function") {
    console.error("ControlledSwitch: The setActive prop must be a function");
    return null;
  }

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <div className="flex items-center space-x-3">
        <div
          ref={switchRef}
          role="switch"
          aria-checked={active}
          aria-labelledby={label ? `${switchId}-label` : undefined}
          aria-describedby={helperMessage ? helperId : undefined}
          aria-invalid={hasError}
          aria-required={required}
          tabIndex={disabled ? -1 : 0}
          title={disabled ? "Impossible de modifier" : `${active ? "Désactiver" : "Activer"} ${label || "ce paramètre"}`}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={getSwitchClasses()}
        >
          <div className={getThumbClasses()}>
            {typeof props.children === "function" ? props.children(active) : props.children}
          </div>
          
          {/* Input hidden pour la compatibilité des formulaires */}
          <input 
            ref={inputRef}
            id={switchId}
            name={name}
            type="checkbox" 
            hidden 
            checked={active}
            disabled={disabled}
            onChange={() => {}} // Contrôlé par le div parent
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
        
        {label && (
          <label 
            id={`${switchId}-label`}
            onClick={handleLabelClick}
            className={getLabelClasses()}
          >
            {label}
          </label>
        )}
      </div>
      
      {/* Message d'aide/erreur */}
      {helperMessage && (
        <div 
          id={hasError ? errorId : helperId}
          className={`text-xs px-1 ${
            hasError 
              ? "text-red-600 flex items-center" 
              : "text-gray-600 italic"
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
        </div>
      )}
    </div>
  );
}
