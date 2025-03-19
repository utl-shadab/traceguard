import React, { useState, useMemo } from "react";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import { LucideEdit, LucideTrash2, LucideSearch, LucideDownload, LucidePlus } from "lucide-react";
import ReactPaginate from "react-paginate";
import Papa from "papaparse";
import Checkbox from "../ui/Checkbox";
import Dropdown from "../ui/Dropdown";

const DataTable = ({
  columns,
  data,
  actions = ["edit", "delete"],
  enableCSV = true,
  showActiveToggle = true,
  showDropdown = false,
  buttonLabel = "Add New",
  onButtonClick = () => { }
}) => {
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("Select User Type");
  // Filtering Data Based on Search Input
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // CSV Download
  const downloadCSV = () => {
    const csvData = Papa.unparse(filteredData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "table_data.csv";
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full overflow-x-auto">
      {/* Header (Button & Search) */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <button
          onClick={onButtonClick}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
        >
          <LucidePlus size={18} className="mr-2" /> {buttonLabel}
        </button>
        {showDropdown && (
          <>
            <Dropdown
              options={["Option 1", "Option 2", "Option 3"]}
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
            />
            <Dropdown
              options={["Option 1", "Option 2", "Option 3"]}
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
            />
          </>
        )}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <LucideSearch size={18} className="absolute left-3 top-2.5 text-gray-500" />
          </div>

          {/* CSV Download (Optional) */}
          {enableCSV && (
            <button
              onClick={downloadCSV}
              className="p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700"
            >
              <LucideDownload size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table {...getTableProps()} className="w-full border-collapse">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="text-left p-3 text-sm font-semibold cursor-pointer"
                  >
                    {column.render("Header")}
                    <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                  </th>
                ))}
                {/* Actions Header */}
                {actions.length > 0 && <th className="text-left p-3 text-sm font-semibold">Actions</th>}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="text-center p-4 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="border-b hover:bg-gray-100">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="p-3 text-sm">
                        {cell.column.id === "active" && showActiveToggle ? (
                          <Checkbox type="checkbox" checked={cell.value} readOnly className="cursor-pointer" color="blue" />
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    ))}
                    {/* Actions Column */}
                    {actions.length > 0 && (
                      <td className="p-3 text-sm flex gap-2">
                        {actions.includes("edit") && (
                          <button className="text-blue-500 cursor-pointer">
                            <LucideEdit size={16} />
                          </button>
                        )}
                        {actions.includes("delete") && (
                          <button className="text-red-500 cursor-pointer">
                            <LucideTrash2 size={16} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">{filteredData.length} Rows</p>
        <ReactPaginate
          pageCount={Math.ceil(filteredData.length / 5)}
          onPageChange={({ selected }) => setGlobalFilter(selected)}
          containerClassName="flex space-x-2"
          activeClassName="text-white bg-blue-500 rounded px-3 py-1"
          pageClassName="px-3 py-1 border rounded"
        />
      </div>
    </div>
  );
};

export default DataTable;
