import React, { useState, useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Menu } from "@headlessui/react";
import {
  LucideDownload,
  LucideMoreVertical,
  LucidePlus,
  LucideEdit,
  LucideTrash2,
  LucideSearch,
} from "lucide-react";
import Papa from "papaparse";
import ReactPaginate from "react-paginate";

// Sample QR Code Data
const qrData = [
  { id: 1, code: "QR-001", type: "Generated", status: "Active", scans: 256, lastScan: "2 hours ago" },
  { id: 2, code: "QR-002", type: "Fake", status: "Blocked", scans: 150, lastScan: "4 hours ago" },
  { id: 3, code: "QR-003", type: "Returned", status: "Inactive", scans: 180, lastScan: "1 day ago" },
  { id: 4, code: "QR-004", type: "Generated", status: "Active", scans: 300, lastScan: "30 minutes ago" },
  { id: 5, code: "QR-005", type: "Damaged", status: "Inactive", scans: 50, lastScan: "5 days ago" },
];

// Table Columns for QR Management
const qrColumns = [
  { Header: "QR Code", accessor: "code" },
  { Header: "Type", accessor: "type" },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-lg ${
          value === "Active"
            ? "bg-green-100 text-green-600"
            : value === "Blocked"
            ? "bg-red-100 text-red-600"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {value}
      </span>
    ),
  },
  { Header: "Total Scans", accessor: "scans" },
  { Header: "Last Scan", accessor: "lastScan" },
  {
    Header: "",
    accessor: "actions",
    Cell: () => (
      <Menu as="div" className="relative">
        <Menu.Button className="p-2 hover:bg-gray-100 rounded-full">
          <LucideMoreVertical size={18} />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
          <Menu.Item>
            {({ active }) => (
              <button className={`flex items-center w-full px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}>
                <LucidePlus size={16} className="mr-2" /> Add
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button className={`flex items-center w-full px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}>
                <LucideEdit size={16} className="mr-2" /> Edit
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button className={`flex items-center w-full px-4 py-2 text-sm text-red-500 ${active ? "bg-gray-100" : ""}`}>
                <LucideTrash2 size={16} className="mr-2" /> Delete
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    ),
  },
];

const QRCodeTable = () => {
  const [search, setSearch] = useState("");

  // Filtering based on search input
  const filteredData = useMemo(() => {
    return qrData.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns: qrColumns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  // CSV Download
  const downloadCSV = () => {
    const csvData = Papa.unparse(filteredData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "qr_code_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">QR Code Management</h2>

        {/* Search Input */}
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

        {/* Download CSV Button */}
        <button onClick={downloadCSV} className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          <LucideDownload size={18} />
        </button>
      </div>

      {/* Table */}
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="text-left p-3 text-sm font-semibold">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b hover:bg-gray-100">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="p-3 text-sm">{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

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

export default QRCodeTable;
