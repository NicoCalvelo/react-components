import GenericModal from "./GenericModal";
import { Column } from "../Layout/Columns";
import DropableZone from "../Forms/DropableZone";
import { addToastWarning } from "../Components/Toasts";
import { useCallback, useEffect, useState } from "react";
import { Row } from "../Layout/Rows";

export default function ImportFileModal({
  title,
  loading = false,
  messageLoading = "Chargement en cours ...",
  showFooter = true,
  showHeader = true,
  open,
  setOpen,
  textActionButton = "Importer",
  errorMessage = null,
  modalSize,
  className = "",
  importErrors,
  onImportFiles,
  color,
  accept = "*",
  multiple = false,
  ...props
}) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!open) setDocuments([]);
  }, [open]);

  const handleDrop = useCallback(
    (files) => {
      if (documents.length > 0 && !multiple && files.length > 0) {
        return addToastWarning("Vous ne pouvez importer qu'un seul fichier");
      }
      const existingNames = new Set(documents.map((doc) => doc.name));
      const newFiles = Array.from(files).filter((file) => {
        if (existingNames.has(file.name)) {
          addToastWarning(`Le fichier ${file.name} est déjà présent dans la liste`);
          return false;
        }
        return true;
      });
      setDocuments((prev) => (multiple ? [...prev, ...newFiles] : newFiles));
    },
    [documents, multiple]
  );

  return (
    <GenericModal
      title={title}
      open={open}
      setOpen={setOpen}
      loading={loading}
      modalSize={modalSize}
      className={className}
      showFooter={showFooter}
      showHeader={showHeader}
      messageLoading={messageLoading}
      textActionButton={textActionButton}
      onActionButton={() => onImportFiles(documents)}
      color={color}
    >
      {!loading && props.children}
      <DropableZone onDrop={handleDrop} className="p-5 rounded" accept={accept} multiple={multiple}>
        {(!importErrors || importErrors.length === 0) && documents.length === 0 && (
          <Column className="items-center justify-center space-y-5 text-gray-400 h-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12">
              <path d="M22 4C22 3.44772 21.5523 3 21 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V4ZM4 15H7.41604C8.1876 16.7659 9.94968 18 12 18C14.0503 18 15.8124 16.7659 16.584 15H20V19H4V15ZM4 5H20V13H15C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13H4V5ZM16 9H13V6H11V9H8L12 13.5L16 9Z"></path>
            </svg>
            <p className="italic text-center">
              Glissez et déposez votre fichier ici ou
              <span className="text-primary-color cursor-pointer hover:underline flex space-x-2 items-center w-full justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M22 11V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V11H22ZM22 9H2V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5H21C21.5523 5 22 5.44772 22 6V9Z"></path>
                </svg>
                <p>parcourir les dossiers</p>
              </span>
            </p>
          </Column>
        )}
        {!importErrors && documents.length > 0 && (
          <Column className="space-y-2 text-primary-color">
            {documents.map((file, index) => (
              <Row key={file.name + index} id={file.name} className="space-x-2 transition-transform duration-300">
                <p>{file.name}</p>
                <IconButton
                  className="text-error-color"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDocuments(documents.filter((doc, i) => i !== index));
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconButton>
              </Row>
            ))}
          </Column>
        )}
        {importErrors && (
          <ul className="list-disc space-y-2 text-error-color">
            {importErrors.map((error, index) => (
              <li className="pb-1" key={index}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </DropableZone>
    </GenericModal>
  );
}
