import Spinner from "../Components/Spinner";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";

export const SelectVariant = Object.freeze({
  OUTLINED: "outlined",
  FILLED: "filled",
});

export const SelectSize = Object.freeze({
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
});

/*
  itemsExample = [
      { id: 1, label: "Durward Reynolds", disabled: false, description: "Optional description" },
      { id: 2, label: "Kenton Towne", disabled: false },
      { id: 3, label: "Therese Wunsch", disabled: false },
      { id: 4, label: "Benedict Kessler", disabled: true },
      { id: 5, label: "Katelyn Rohan", disabled: false },
    ];
*/

export default function Select({
  items = [],
  defaultValue,
  value,
  setValue,
  title,
  loading = false,
  isMulti = false,
  placeholder = "Sélectionner une option...",
  isNullable = true,
  onChange,
  buttonClassName = "",
  className = "",
  disabled = false,
  required = false,
  errorMessage,
  supportingText,
  variant = SelectVariant.OUTLINED,
  size = SelectSize.MEDIUM,
  id,
  name,
  onFocus,
  onBlur,
  displayFunction,
  maxDisplayItems = 3,
  noOptionsMessage = "Aucune option disponible",
  loadingMessage = "Chargement...",
  ...props
}) {
  const [selected, setSelected] = useState(loading ? null : getSelected());
  const [isFocused, setIsFocused] = useState(false);
  const [currentError, setCurrentError] = useState(null);
  const selectRef = useRef(null);

  // ID unique pour le composant
  const selectId = useMemo(() => {
    return id || `select-${Math.random().toString(36).substring(2, 11)}`;
  }, [id]);

  // IDs pour les éléments associés
  const helperId = useMemo(() => `${selectId}-helper`, [selectId]);
  const errorId = useMemo(() => `${selectId}-error`, [selectId]);

  // Validation des items
  const validatedItems = useMemo(() => {
    if (!Array.isArray(items)) {
      console.warn('Select: items should be an array');
      return [];
    }

    return items.filter(item => {
      if (!item || typeof item !== 'object') {
        console.warn('Select: Each item should be an object');
        return false;
      }
      if (item.id === undefined) {
        console.warn('Select: Each item should have an "id" property');
        return false;
      }
      if (!item.label && !item.value && !item.name) {
        console.warn('Select: Each item should have a "label", "value", or "name" property');
        return false;
      }
      return true;
    }).map(item => ({
      id: item.id,
      label: item.label || item.value || item.name,
      disabled: item.disabled || false,
      description: item.description,
      ...item
    }));
  }, [items]);

  // Support de value/setValue en plus de defaultValue/onChange
  const currentValue = useMemo(() => {
    return value !== undefined ? value : selected;
  }, [value, selected]);

  const handleValueChange = useCallback((newValue) => {
    if (value === undefined) {
      setSelected(newValue);
    }
    
    setCurrentError(null);
    
    // Validation required
    if (required && (!newValue || (Array.isArray(newValue) && newValue.length === 0))) {
      const errorMsg = "Veuillez sélectionner une option.";
      setCurrentError(errorMsg);
    }

    // Appel des callbacks
    if (setValue) {
      try {
        setValue(newValue);
      } catch (error) {
        console.error('Error in Select setValue callback:', error);
        setCurrentError("Erreur lors de la sélection.");
      }
    }
    
    if (onChange) {
      try {
        onChange(newValue);
      } catch (error) {
        console.error('Error in Select onChange callback:', error);
        setCurrentError("Erreur lors de la sélection.");
      }
    }
  }, [setValue, onChange, required, value]);

  // Fonction pour obtenir la sélection initiale
  function getSelected() {
    if (loading || validatedItems.length === 0) return isMulti ? [] : null;
    
    if (isMulti) {
      if (defaultValue && Array.isArray(defaultValue)) {
        return validatedItems.filter(item => 
          defaultValue.find(def => (def.value ?? def.id) === (item.value ?? item.id))
        );
      }
      return isNullable ? [] : [validatedItems[0]];
    } else {
      if (defaultValue) {
        return validatedItems.find(item => 
          item.id === defaultValue.id || item.id === defaultValue
        ) || null;
      }
      return null;
    }
  }

  // Effet pour mettre à jour la sélection quand les items se chargent
  useEffect(() => {
    if (!loading && currentValue === null && value === undefined) {
      const initialValue = getSelected();
      setSelected(initialValue);
    }
  }, [loading, validatedItems]);

  // Gestion du focus
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

  // Fonction pour effacer la sélection
  const handleClear = useCallback((event) => {
    event.stopPropagation();
    const clearedValue = isMulti ? [] : null;
    handleValueChange(clearedValue);
  }, [isMulti, handleValueChange]);

  // Fonction d'affichage du texte sélectionné
  const getDisplayText = useCallback((selectedValue) => {
    if (!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0)) {
      return placeholder;
    }

    if (displayFunction) {
      return displayFunction(selectedValue);
    }

    if (isMulti && Array.isArray(selectedValue)) {
      if (selectedValue.length <= maxDisplayItems) {
        return selectedValue.map(item => item.label || item.name).join(", ");
      } else {
        return `${selectedValue.length} éléments sélectionnés`;
      }
    }

    return selectedValue.label || selectedValue.value || selectedValue.name;
  }, [placeholder, displayFunction, isMulti, maxDisplayItems]);

  // Messages d'aide/erreur
  const helperMessage = useMemo(() => {
    if (currentError || errorMessage) return currentError || errorMessage;
    return supportingText;
  }, [currentError, errorMessage, supportingText]);

  const hasError = Boolean(currentError || errorMessage);

  // Classes CSS basées sur la variante et la taille
  const getButtonClasses = useCallback(() => {
    let baseClasses = "relative peer flex items-center w-full input transition-all duration-200 cursor-pointer";
    
    // Taille
    switch (size) {
      case SelectSize.SMALL:
        baseClasses += title ? " pt-2.5 pb-1.5 px-2 text-sm" : " py-1.5 px-2 text-sm";
        break;
      case SelectSize.LARGE:
        baseClasses += title ? " pt-4 pb-3 px-3 text-lg" : " py-3 px-3 text-lg";
        break;
      default: // MEDIUM
        baseClasses += title ? " pt-3 pb-2.5 px-2" : " py-2 px-2";
    }

    // Variante
    switch (variant) {
      case SelectVariant.FILLED:
        baseClasses += " !border-0 !border-b-2 !rounded-t-lg !rounded-b-none bg-gray-100";
        if (hasError) {
          baseClasses += " !border-red-500";
        } else if (isFocused) {
          baseClasses += " !border-primary-color";
        } else {
          baseClasses += " !border-gray-400";
        }
        break;
      default: // OUTLINED
        baseClasses += " border rounded-lg";
        if (hasError) {
          baseClasses += " !border-red-500 !ring-red-500";
        } else if (isFocused) {
          baseClasses += " !border-primary-color !ring-primary-color";
        } else {
          baseClasses += " border-gray-300";
        }
    }

    // État disabled
    if (disabled) {
      baseClasses += " opacity-50 cursor-not-allowed";
    }

    // Classes personnalisées
    if (buttonClassName) {
      baseClasses += ` ${buttonClassName}`;
    }

    return baseClasses;
  }, [variant, size, title, hasError, isFocused, disabled, buttonClassName]);

  const getLabelClasses = useCallback(() => {
    let baseClasses = "absolute pointer-events-none transition-all duration-200 text-xs truncate z-10";
    
    if (variant === SelectVariant.FILLED) {
      baseClasses += " top-1 left-2";
    } else {
      baseClasses += " -top-2 left-2 px-2 bg-background-color";
    }

    if (hasError) {
      baseClasses += " text-red-600";
    } else if (isFocused) {
      baseClasses += " text-primary-color font-medium";
    } else {
      baseClasses += " text-text-light";
    }

    if (required) {
      baseClasses += " after:content-['*'] after:text-red-500 after:ml-1";
    }

    return baseClasses;
  }, [variant, hasError, isFocused, required]);

  // Vérifier si une option est sélectionnée
  const isOptionSelected = useCallback((item) => {
    if (!currentValue) return false;
    if (isMulti && Array.isArray(currentValue)) {
      return currentValue.find(selected => selected.id === item.id) !== undefined;
    }
    return currentValue.id === item.id;
  }, [currentValue, isMulti]);

  const hasSelection = currentValue && (!Array.isArray(currentValue) || currentValue.length > 0);

  return (
    <Listbox
      value={currentValue}
      onChange={handleValueChange}
      multiple={isMulti}
      by="id"
      disabled={disabled}
      name={name}
      {...props}
    >
      <div className={`flex flex-col relative ${disabled ? "opacity-50" : ""} ${className}`}>
        {title && (
          <label className={getLabelClasses()}>
            {title}
          </label>
        )}
        
        <ListboxButton
          ref={selectRef}
          className={getButtonClasses()}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-describedby={helperMessage ? helperId : undefined}
          aria-invalid={hasError}
          aria-required={required}
        >
          {loading ? (
            <>
              <span className="text-text-light flex-grow truncate font-light italic pr-6">
                {loadingMessage}
              </span>
              <Spinner className="w-4 h-4 flex-shrink-0" />
            </>
          ) : (
            <>
              <span className={`flex-grow truncate ${
                hasSelection ? "font-medium" : "text-text-light font-light italic"
              }`}>
                {getDisplayText(currentValue)}
              </span>
              
              {/* Bouton clear */}
              {isNullable && hasSelection && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-shrink-0 p-1 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Effacer la sélection"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
              
              {/* Icône dropdown */}
              <svg 
                className="w-4 h-4 ml-2 flex-shrink-0 text-gray-400 transition-transform group-data-[open]:rotate-180" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
          
          {/* Icône d'erreur */}
          {hasError && (
            <svg 
              className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500"
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </ListboxButton>

        {/* Message d'aide/erreur */}
        {helperMessage && (
          <div 
            id={hasError ? errorId : helperId}
            className={`text-xs mt-1 px-2 ${
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

        {/* Options dropdown */}
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <ListboxOptions className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {validatedItems.length === 0 ? (
              <div className="py-3 px-4 text-gray-500 text-center">
                {loading ? loadingMessage : noOptionsMessage}
              </div>
            ) : (
              validatedItems.map((item, index) => {
                const isSelected = isOptionSelected(item);
                return (
                  <ListboxOption
                    key={`${item.id}-${index}`}
                    value={item}
                    disabled={item.disabled}
                    className={({ active, selected }) => 
                      `relative cursor-pointer select-none py-2 px-4 transition-colors ${
                        active 
                          ? "bg-primary-color text-white" 
                          : "text-gray-900"
                      } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`
                    }
                  >
                    {({ active, selected }) => (
                      <div className="flex items-start space-x-3">
                        {/* Icône de sélection */}
                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                          {(selected || isSelected) && (
                            <svg 
                              className="w-4 h-4" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        
                        {/* Contenu de l'option */}
                        <div className="flex-grow min-w-0">
                          <div className={`block truncate ${
                            selected || isSelected ? "font-semibold" : ""
                          }`}>
                            {item.label}
                          </div>
                          {item.description && (
                            <div className={`text-sm mt-1 ${
                              active ? "text-gray-200" : "text-gray-500"
                            }`}>
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </ListboxOption>
                );
              })
            )}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
