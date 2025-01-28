import React from "react";

export default function DropableZone({ className = "p-5 rounded", children, onDrop, id = "dropableZone", accept = "*", multiple = false }) {
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer?.files || e.target.files;
    if (multiple) onDrop(files);
    else if (files.length > 0) onDrop([files[0]]);
    document.getElementById(id).classList.remove("!border-blue-500");
    document.getElementById(id).classList.remove("!font-bold");
    document.getElementById(id).classList.add("border-dashed");
    document.getElementById(id + "file").value = "";
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById(id).classList.add("!border-blue-500");
    document.getElementById(id).classList.add("!font-bold");
    document.getElementById(id).classList.remove("border-dashed");
  }

  function handleDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById(id).classList.remove("!border-blue-500");
    document.getElementById(id).classList.remove("!font-bold");
    document.getElementById(id).classList.add("border-dashed");
  }

  return (
    <>
      <input type="file" id={id + "file"} style={{ display: "none" }} onChange={handleDrop} accept={accept} multiple={multiple} />
      <div
        id={id}
        className={"transition-all ease-out w-full h-full cursor-pointer border border-dashed border-gray-300 text-gray-400 " + className}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById(id + "file").click()}
      >
        {children}
      </div>
    </>
  );
}
