import React, { useState } from "react";
import Spinner from "../Components/Spinner";
import { addToastError } from "../Components/Toasts";
import { useLocation, useNavigate } from "react-router-dom";

export default function DataTable({
  numeration = true,
  data,
  columns,
  striped = true,
  onClickRow,
  customStyles,
  pagination = false,
  maxElements,
  rowsPerPage = 50,
  onChangePage,
  showFooter = true,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [config, setConfig] = useState({
    sort: {
      column: null,
      direction: null,
    },
    page: location.search ? parseInt(new URLSearchParams(location.search).get("page") || 1) : 1,
  });

  const handleSort = (column) => {
    if (!column.sortable) return;

    let direction = "asc";
    if (config.sort.column === column) {
      direction = config.sort.direction === "asc" ? "desc" : "asc";
    }

    setConfig({
      ...config,
      sort: {
        column,
        direction,
      },
    });
  };

  const handleSetPage = (page) => {
    if (page < 1) return;
    if (page > Math.ceil(maxElements / data.length)) return;

    setConfig({
      ...config,
      page,
    });
    if (onChangePage) onChangePage(page);

    // change search params
    navigate("?page=" + page);
  };

  return (
    <table className={customStyles?.table || defaulStyles.table}>
      <thead className={customStyles?.thead || defaulStyles.thead}>
        <tr className={customStyles?.tr || defaulStyles.tr}>
          {numeration && <th className={customStyles?.th || defaulStyles.th}>#</th>}
          {columns.map((column, index) => (
            <th key={index} className={customStyles?.th || defaulStyles.th} onClick={() => handleSort(column)} style={{ width: column.width || "auto" }}>
              <div className="flex items-center space-x-2">
                <p className="flex-grow">{column.title}</p>
                {column.sortable && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 group-hover:opacity-100 opacity-0 cursor-pointer"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={customStyles?.tbody || defaulStyles.tbody}>
        {!data && (
          <tr>
            <td colSpan={columns.length + (numeration ? 1 : 0)} className="text-center p-10 bg-gray-50">
              <div className="flex flex-col space-y-2 items-center justify-center">
                <Spinner />
                <p>Chargement...</p>
              </div>
            </td>
          </tr>
        )}
        {data && data.length === 0 && (
          <tr>
            <td colSpan={columns.length + (numeration ? 1 : 0)} className="text-center p-10 bg-gray-50">
              Aucune donnée
            </td>
          </tr>
        )}
        {data
          ?.sort((a, b) => {
            if (!config.sort.column) return 0;

            const valueA = config.sort.column.value(a);
            const valueB = config.sort.column.value(b);

            if (config.sort.direction === "asc") {
              return valueA > valueB ? 1 : -1;
            } else {
              return valueA < valueB ? 1 : -1;
            }
          })
          .map((row, index) => (
            <tr
              key={index}
              onClick={onClickRow ? () => onClickRow(row) : undefined}
              className={
                (customStyles?.tr || defaulStyles.tr) +
                (striped && index % 2 === 0 ? " bg-gray-50" : "") +
                (onClickRow ? " hover:bg-gray-100 cursor-pointer" : "")
              }
            >
              {numeration && <td className={customStyles?.td || defaulStyles.td}>{index + 1 + (config.page - 1) * rowsPerPage}</td>}
              {columns.map((column, i) => (
                <td key={i} className={customStyles?.td || defaulStyles.td}>
                  {column.cell ? column.cell(row, index) : column.value(row, index)}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
      {showFooter && (
        <tfoot>
          {!pagination && data && (
            <tr>
              <td colSpan={columns.length + (numeration ? 1 : 0)} className="p-3 border-t border-gray-200 text-sm">
                <div className="flex justify-end w-full">
                  <p>{data.length} éléments affichés</p>
                </div>
              </td>
            </tr>
          )}
          {pagination && (
            <tr>
              <td colSpan={columns.length + (numeration ? 1 : 0)} className="p-3 border-t border-gray-200">
                <div className="flex items-center justify-end space-x-5 text-sm">
                  <button
                    className={
                      "pr-4 pl-2 py-1 flex items-center space-x-1 " + (config.page === 1 ? "opacity-50 cursor-default pointer-events-none" : "hover:underline")
                    }
                    onClick={() => handleSetPage(config.page - 1)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path
                        fillRule="evenodd"
                        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Précédent</p>
                  </button>
                  {maxElements && rowsPerPage && (
                    <p>
                      page
                      <select
                        className="border border-gray-200 rounded-md p-1 text-center"
                        value={config.page}
                        onChange={(e) => handleSetPage(parseInt(e.target.value))}
                      >
                        {Array.from({ length: Math.ceil(maxElements / rowsPerPage) }, (_, i) => i + 1).map((page) => (
                          <option key={page} value={page}>
                            {page}
                          </option>
                        ))}
                      </select>{" "}
                      / {Math.ceil(maxElements / rowsPerPage)}
                    </p>
                  )}
                  <button
                    className={
                      "pr-2 pl-4 py-1 flex items-center space-x-1 " +
                      (config.page >= Math.ceil(maxElements / rowsPerPage) ? "opacity-50 cursor-default pointer-events-none" : "hover:underline")
                    }
                    onClick={() => handleSetPage(config.page + 1)}
                  >
                    <p>Suivant</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path
                        fillRule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tfoot>
      )}
    </table>
  );
}

const defaulStyles = {
  table: "table-auto w-full border-collapse bg-white border border-gray-200 rounded-xl overflow-hidden clip-table",
  thead: "border-b border-gray-200",
  tbody: "",
  th: "p-3 pb-1 text-left group",
  td: "pl-3 pr-1 py-1 text-ellipsis overflow-ellipsis break-words",
  tr: "",
};
