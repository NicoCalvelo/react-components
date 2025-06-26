import React, { useCallback, useRef, useState, useMemo } from "react";

// Enum pour les variantes visuelles
export const DropZoneVariant = {
  OUTLINED: 'outlined',
  FILLED: 'filled',
  DASHED: 'dashed'
};

// Enum pour les tailles
export const DropZoneSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
};

// Enum pour les états d'erreur
export const DropZoneError = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  TOO_MANY_FILES: 'TOO_MANY_FILES',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED'
};

// Utilitaires pour la validation des fichiers
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const validateFileType = (file, acceptedTypes) => {
  if (!acceptedTypes || acceptedTypes === "*" || acceptedTypes.includes("*")) return true;
  
  const fileType = file.type;
  const fileName = file.name.toLowerCase();
  
  return acceptedTypes.some(accept => {
    if (accept.startsWith('.')) {
      return fileName.endsWith(accept.toLowerCase());
    }
    if (accept.includes('/')) {
      return fileType === accept || fileType.startsWith(accept.replace('*', ''));
    }
    return false;
  });
};

export default function DropableZone({
  className = "",
  children,
  onDrop,
  onError,
  onValidationError,
  onDragEnter,
  onDragLeave,
  id,
  accept = "*",
  multiple = false,
  disabled = false,
  maxFileSize = 10 * 1024 * 1024, // 10MB par défaut
  maxFiles = multiple ? 10 : 1,
  variant = DropZoneVariant.DASHED,
  size = DropZoneSize.MD,
  showPreview = false,
  errorMessage,
  helperText = "Glissez vos fichiers ici ou cliquez pour parcourir",
  ariaLabel,
  name
}) {
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [currentError, setCurrentError] = useState(null);

  // Configuration des tailles
  const sizeConfig = useMemo(() => {
    switch (size) {
      case DropZoneSize.SM:
        return { padding: 'p-3', minHeight: 'min-h-24', textSize: 'text-xs' };
      case DropZoneSize.LG:
        return { padding: 'p-8', minHeight: 'min-h-48', textSize: 'text-base' };
      default:
        return { padding: 'p-5', minHeight: 'min-h-32', textSize: 'text-sm' };
    }
  }, [size]);

  // Configuration des variants
  const variantConfig = useMemo(() => {
    const baseClasses = "transition-all duration-200 ease-in-out border-2 rounded";
    
    switch (variant) {
      case DropZoneVariant.OUTLINED:
        return {
          base: `${baseClasses} border-solid`,
          normal: "border-gray-300 bg-transparent",
          hover: "border-primary-color bg-primary-color bg-opacity-5",
          active: "border-primary-color bg-primary-color bg-opacity-10",
          error: "border-error-color bg-error-light/50",
          disabled: "border-gray-200 bg-gray-50 opacity-50"
        };
      case DropZoneVariant.FILLED:
        return {
          base: `${baseClasses} border-solid`,
          normal: "border-gray-200 bg-gray-50",
          hover: "border-primary-color bg-primary-color bg-opacity-10",
          active: "border-primary-color bg-primary-color bg-opacity-20",
          error: "border-error-color bg-error-light",
          disabled: "border-gray-200 bg-gray-100 opacity-50"
        };
      default: // DASHED
        return {
          base: `${baseClasses} border-dashed`,
          normal: "border-gray-300 bg-transparent",
          hover: "border-primary-color bg-primary-color bg-opacity-5",
          active: "border-primary-color bg-primary-color bg-opacity-10 border-solid",
          error: "border-error-color bg-error-light/50",
          disabled: "border-gray-200 bg-gray-50 opacity-50"
        };
    }
  }, [variant]);

  // Traitement et validation des fichiers
  const processFiles = useCallback((files) => {
    try {
      const fileArray = Array.from(files);
      const errors = [];
      const validFiles = [];

      // Validation du nombre de fichiers
      if (!multiple && fileArray.length > 1) {
        errors.push({
          type: DropZoneError.TOO_MANY_FILES,
          message: "Un seul fichier est autorisé"
        });
        return { validFiles: [], errors };
      }

      if (multiple && fileArray.length > maxFiles) {
        errors.push({
          type: DropZoneError.TOO_MANY_FILES,
          message: `Maximum ${maxFiles} fichiers autorisés`
        });
        return { validFiles: [], errors };
      }

      // Validation de chaque fichier
      fileArray.forEach((file, index) => {
        // Validation de la taille
        if (file.size > maxFileSize) {
          errors.push({
            type: DropZoneError.FILE_TOO_LARGE,
            message: `${file.name} est trop volumineux (${formatFileSize(file.size)}). Taille maximum: ${formatFileSize(maxFileSize)}`,
            file
          });
          return;
        }

        // Validation du type
        const acceptedTypes = Array.isArray(accept) ? accept : accept.split(',').map(s => s.trim());
        if (!validateFileType(file, acceptedTypes)) {
          errors.push({
            type: DropZoneError.INVALID_FILE_TYPE,
            message: `${file.name} n'est pas un type de fichier autorisé`,
            file
          });
          return;
        }

        validFiles.push(file);
      });

      return { validFiles, errors };
    } catch (error) {
      console.error('Error processing files:', error);
      return {
        validFiles: [],
        errors: [{
          type: DropZoneError.UPLOAD_FAILED,
          message: "Erreur lors du traitement des fichiers"
        }]
      };
    }
  }, [accept, maxFileSize, maxFiles, multiple]);

  // Gestionnaire de drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;

    setIsDragActive(false);
    setDragCounter(0);
    setCurrentError(null);

    const files = e.dataTransfer?.files || e.target.files;
    if (!files || files.length === 0) return;

    const { validFiles, errors } = processFiles(files);

    if (errors.length > 0) {
      const errorMsg = errors.map(err => err.message).join(', ');
      setCurrentError(errorMsg);
      
      if (onValidationError) {
        onValidationError(errors);
      }
      if (onError) {
        onError(new Error(errorMsg));
      }
      return;
    }

    if (validFiles.length > 0 && onDrop) {
      try {
        onDrop(multiple ? validFiles : validFiles);
      } catch (error) {
        console.error('Error in onDrop callback:', error);
        setCurrentError("Erreur lors du traitement des fichiers");
        if (onError) {
          onError(error);
        }
      }
    }

    // Reset du input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [disabled, processFiles, multiple, onDrop, onValidationError, onError]);

  // Gestionnaires de drag
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;

    setDragCounter(prev => prev + 1);
    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
      if (onDragEnter) {
        onDragEnter(e);
      }
    }
  }, [disabled, onDragEnter]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;

    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragActive(false);
        if (onDragLeave) {
          onDragLeave(e);
        }
      }
      return newCounter;
    });
  }, [disabled, onDragLeave]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Gestionnaire de clic
  const handleClick = useCallback(() => {
    if (disabled || !fileInputRef.current) return;
    
    setCurrentError(null);
    fileInputRef.current.click();
  }, [disabled]);

  // Gestionnaire de clavier
  const handleKeyDown = useCallback((e) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
    if (e.key === 'Escape') {
      setIsDragActive(false);
      setCurrentError(null);
    }
  }, [disabled, handleClick]);

  // Classes CSS finales
  const getDropZoneClasses = useCallback(() => {
    const config = variantConfig;
    let classes = `${config.base} ${sizeConfig.padding} ${sizeConfig.minHeight} w-full cursor-pointer`;
    
    if (disabled) {
      classes += ` ${config.disabled} cursor-not-allowed`;
    } else if (currentError) {
      classes += ` ${config.error}`;
    } else if (isDragActive) {
      classes += ` ${config.active}`;
    } else {
      classes += ` ${config.normal} hover:${config.hover.split(' ').join(' hover:')}`;
    }
    
    return `${classes} ${className}`;
  }, [variantConfig, sizeConfig, disabled, currentError, isDragActive, className]);

  // ID unique
  const dropZoneId = useMemo(() => {
    return id || `dropzone-${Math.random().toString(36).substring(2, 11)}`;
  }, [id]);

  const acceptString = useMemo(() => {
    if (Array.isArray(accept)) {
      return accept.join(',');
    }
    return accept;
  }, [accept]);

  return (
    <div className="flex flex-col">
      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleDrop}
        accept={acceptString}
        multiple={multiple}
        name={name}
        aria-hidden="true"
      />
      
      {/* Zone de drop */}
      <div
        ref={dropZoneRef}
        id={dropZoneId}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel || `Zone de téléchargement de fichiers. ${multiple ? 'Plusieurs fichiers' : 'Un fichier'} autorisé(s). ${helperText}`}
        aria-describedby={currentError ? `${dropZoneId}-error` : `${dropZoneId}-helper`}
        aria-disabled={disabled}
        className={getDropZoneClasses()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
          {/* Icône principale */}
          <div className="flex items-center justify-center">
            {isDragActive ? (
              <svg 
                className="w-12 h-12 text-primary-color animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            ) : currentError ? (
              <svg 
                className="w-12 h-12 text-error-color" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg 
                className={`w-12 h-12 ${disabled ? 'text-gray-400' : 'text-gray-500'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </div>

          {/* Contenu personnalisé ou texte par défaut */}
          {children || (
            <div className={`${sizeConfig.textSize} space-y-2`}>
              {isDragActive ? (
                <p className="font-medium text-primary-color">
                  Déposez vos fichiers ici
                </p>
              ) : currentError ? (
                <p className="font-medium text-red-600">
                  Erreur de téléchargement
                </p>
              ) : (
                <>
                  <p className={`font-medium ${disabled ? 'text-gray-400' : 'text-gray-600'}`}>
                    {helperText}
                  </p>
                  {!disabled && (
                    <p className="text-xs text-gray-500">
                      {multiple ? `Maximum ${maxFiles} fichiers` : "Un seul fichier"} • 
                      Taille max: {formatFileSize(maxFileSize)}
                      {acceptString !== "*" && ` • Types: ${acceptString}`}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Messages d'aide et d'erreur */}
      <div className="mt-2">
        {currentError && (
          <div id={`${dropZoneId}-error`} className="flex items-center space-x-2 text-red-600 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{currentError}</span>
          </div>
        )}
        
        {!currentError && errorMessage && (
          <div id={`${dropZoneId}-error`} className="flex items-center space-x-2 text-red-600 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {!currentError && !errorMessage && helperText && (
          <p id={`${dropZoneId}-helper`} className="text-xs text-gray-500">
            {disabled ? "Zone de téléchargement désactivée" : "Glisser-déposer ou cliquer pour sélectionner"}
          </p>
        )}
      </div>
    </div>
  );
}
