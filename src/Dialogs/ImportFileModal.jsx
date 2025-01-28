import { Row } from "../Layout/Rows";
import GenericModal from "./GenericModal";
import { Column } from "../Layout/Columns";
import { useEffect, useState } from "react";
import IconButton from "../Buttons/IconButton";
import DropableZone from "../Forms/DropableZone";
import { addToastWarning } from "../Components/Toasts";

export default function ImportFileModal({
  title,
  loading = false,
  messageLoading = "Chargement en cours ...",
  importErrors,
  onImportFiles,
  open,
  setOpen,
  textActionButton = "Importer",
  color,
  accept = "*",
  multiple = false,
  ...props
}) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!open) setDocuments([]);
  }, [open]);

  function handleDrop(files) {
    if (documents.length > 0 && !multiple && files.length > 0) {
      return addToastWarning("Vous ne pouvez importer qu'un seul fichier");
    }

    const newFiles = Array.from(files).filter((file) => {
      if (documents.some((doc) => doc.name === file.name)) {
        addToastWarning(`Le fichier ${file.name} est déjà présent dans la liste`);
        return false;
      }
      return true;
    });

    setDocuments((prevDocuments) => (multiple ? [...prevDocuments, ...newFiles] : newFiles));
  }

  return (
    <GenericModal
      title={title}
      open={open}
      setOpen={setOpen}
      loading={loading}
      messageLoading={messageLoading}
      textActionButton={textActionButton}
      onActionButton={() => onImportFiles(documents)}
      color={color}
      {...props}
    >
      <Column className="overflow-auto p-5 h-full">
        <DropableZone onDrop={handleDrop} className="p-5 rounded" accept={accept} multiple={multiple}>
          {!importErrors && documents.length === 0 && (
            <Column className="items-center justify-center space-y-5 text-gray-400 h-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                />
              </svg>
              <p className="italic text-center">Glissez et déposez votre fichier ici</p>
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
            <ul className="list-discspace-y-2">
              {importErrors.map((error, index) => (
                <li className="pb-1" key={index}>
                  {error}
                </li>
              ))}
            </ul>
          )}
        </DropableZone>
      </Column>
    </GenericModal>
  );
}
