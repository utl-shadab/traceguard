import React, { useState, useMemo } from "react";
import {
  LucideEdit,
  LucideDownload,
  LucidePlus,
  LucideSearch,
  LucideArrowUpDown,
} from "lucide-react";
import Papa from "papaparse";
import ReactPaginate from "react-paginate";
import CustomModal from "../Modal/CustomModal";
import Checkbox from "../ui/Checkbox";
import InnerModalInputs from "../Modal/InnerModalInputs";

const CustomTable = ({
  columns,
  data,
  title,
  onAdd,
  setUpdateTable,
  updateTable,
}) => {
const CustomTable = ({
  columns,
  data,
  title,
  onAdd,
  setUpdateTable,
  updateTable,
}) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const itemsPerPage = 2;
  // 🔽🔼 **Sorting Logic**
  const sortedAndFilteredData = useMemo(() => {
    let sortedData = [...data];

    // 🔼🔽 Sorting
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // 🔍 Filtering
    return sortedData.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const downloadCSV = () => {
    const csvData = Papa.unparse(filteredData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(" ", "_")}_data.csv`;
    link.click();
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);

    setFormData({
      companyName: row.name,
      companyDisplayName: row.displayName,
      prefix: row.prefix,
      email: row.email,
      phone: row.phone,
      websiteUrl: row.websiteUrl,
      smsMobile: row.smsMobile,
      whatsappMobile: row.whatsappMobile,
      loyaltyThrough: row.loyaltyThrough,
      redemptionType: row.redemptionType,
      active: row.active,
      services: row.services,
    });
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  const options = ["Scratch", "QR Code"];
  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    companyDisplayName: "",
    prefix: "",
    email: "",
    phone: "",
    websiteUrl: "",
    smsMobile: "",
    whatsappMobile: "",
    loyaltyThrough: options[0],
    redemptionType: [],
    active: false,
    services: {
      scmService: false,
      warrantyService: false,
      smsAuthentication: false,
      whatsappService: false,
      pdfGeneration: false,
      loyalty: false,
    },
  });

  const onSave = () => {
    if (!formData.companyName.trim() || !formData.companyDisplayName.trim()) {
      alert("Company Name and Company Display Name are required.");
      return;
    }
    if (!formData.prefix.trim()) {
      alert("prefix is required.");
    }
    if (!formData.email.trim()) {
      alert("Email is required.");
      return;
    }
    if (!formData.phone.trim()) {
      alert("Phone is required.");
      return;
    }

    // Retrieve existing data from localStorage
    const storedData = localStorage.getItem("companyData");
    let companyData = storedData ? JSON.parse(storedData) : [];

    // Check for duplicates
    const isDuplicate = companyData.some(
      (company) =>
        company.name === formData.companyName ||
        company.displayName === formData.companyDisplayName
    );

    if (isDuplicate) {
      alert("Company Name or Company Display Name already exists.");
      return;
    }

    // Add new data to the array
    const newCompany = {
      id: companyData.length + 1, // Generate a unique ID
      name: formData.companyName,
      displayName: formData.companyDisplayName,
      prefix: formData.prefix,
      email: formData.email,
      phone: formData.phone,
      websiteUrl: formData.websiteUrl,
      smsMobile: formData.smsMobile,
      whatsappMobile: formData.whatsappMobile,
      loyaltyThrough: formData.loyaltyThrough,
      redemptionType: formData.redemptionType,
      active: formData.active,
      services: formData.services,
    };

    companyData.push(newCompany);

    // Save updated data back to localStorage
    localStorage.setItem("companyData", JSON.stringify(companyData));

    // Reset form fields
    setFormData({
      companyName: "",
      companyDisplayName: "",
      prefix: "",
      email: "",
      phone: "",
      websiteUrl: "",
      smsMobile: "",
      whatsappMobile: "",
      loyaltyThrough: options[0],
      redemptionType: [],
      active: false,
      services: {
        scmService: false,
        warrantyService: false,
        smsAuthentication: false,
        whatsappService: false,
        pdfGeneration: false,
        loyalty: false,
      },
    });

    handleCloseModal();
    setUpdateTable(!updateTable);
    alert("company details saved successfully.");
  };
  };

  const pageCount = Math.ceil(sortedAndFilteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = sortedAndFilteredData.slice(offset, offset + itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-3 py-2 bg-[#5765F6] text-white font-semibold rounded-md hover:bg-blue-700 transition">
          <LucidePlus size={16} className="mr-2" />
          Add {title}
        </button>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-3 py-2 bg-[#5765F6] text-white font-semibold rounded-md hover:bg-blue-700 transition">
          <LucidePlus size={16} className="mr-2" />
          Add {title}
        </button>

        <div className="flex gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <LucideSearch
              size={18}
              className="absolute left-3 top-2.5 text-gray-500"
            />
          </div>
        <div className="flex gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <LucideSearch
              size={18}
              className="absolute left-3 top-2.5 text-gray-500"
            />
          </div>

          {/* Buttons */}
          {/* <div className="flex space-x-2"> */}
          {/* Buttons */}
          {/* <div className="flex space-x-2"> */}
          <button
            onClick={downloadCSV}
            className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            <LucideDownload size={18} />
          </button>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              {columns.map((col) => (

                <>

                  <th
                    key={col.accessor}
                    className="p-3 text-left text-sm font-semibold cursor-pointer  items-center gap-1"
                    onClick={() => handleSort(col.accessor)}
                  >
                    {col.Header}
                    <span className="inline-block ml-1">

                    
                    <LucideArrowUpDown
                      size={12}
                      className={
                        sortConfig.key === col.accessor
                          ? sortConfig.direction === "asc"
                            ? "text-blue-500"
                            : "text-red-500"
                          : "text-gray-500"
                      }
                      />
                      </span>
                  </th>

                </>
              ))}
              <th className="p-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-100">
                {columns.map((col) => (
                  <td key={col.accessor} className="p-3 text-sm">
                    {/* If "Active" column, show a real checkbox */}
                    {col.accessor === "active" ? (
                      <Checkbox
                        checked={row[col.accessor]}
                        onChange={() => { }}
                        color="blue"
                      />
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
                <td className="p-3 text-sm">
                  {/* Edit Button - Opens Blank Modal */}
                  <button
                    onClick={() => handleEditClick(row)}
                    className="text-blue-500 hover:text-blue-700">
                    <LucideEdit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">{filteredData.length} Rows</p>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName="flex space-x-2 cursor-pointer"
          activeClassName="text-white bg-[#06D6AE] rounded px-3 py-1 "
          pageClassName="px-3 py-1 border  rounded"
        />
      </div>

      {isModalOpen && (
        <CustomModal
          onSave={onSave}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedRow ? `Edit ${title}` : `Add ${title}`}>
          title={selectedRow ? `Edit ${title}` : `Add ${title}`}>
          <InnerModalInputs formData={formData} setFormData={setFormData} />
        </CustomModal>
      )}
    </div>
  );
};

export default CustomTable;