import React, { useState } from "react";
import DataTable from "../components/Tables/DataTable";
import CustomModal from "../components/Modal/CustomModal";
import CategoryManager from "../components/RoleAccess/CategoryManager";

// Sample Data
const sampleData = [
  // { id: 60392, companyName: "Binario Technologies", category: "GENERAL PRODUCTS", productName: "Thermometer", active: true },
  // { id: 60391, companyName: "Binario Technologies", category: "GENERAL PRODUCTS", productName: "Injections", active: true },
  // { id: 60390, companyName: "Binario Technologies", category: "GENERAL PRODUCTS", productName: "Syrups", active: false },
  // { id: 60389, companyName: "Binario Technologies", category: "GENERAL PRODUCTS", productName: "Tablets", active: true },
];

// Column Definitions
const sampleColumns = [
  // { Header: "ID", accessor: "id" },
  { Header: "Company Name", accessor: "companyName" },
  { Header: "Category", accessor: "category" },
  { Header: "Product Name", accessor: "productName" },
  { Header: "Price", accessor: "price" },
  { Header: "Update Date", accessor: "updatedate" },
  { Header: "Active", accessor: "active" },
];

const RoleMaster = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <DataTable
        columns={sampleColumns}
        data={sampleData}
        actions={["edit", "delete"]}
        enableCSV={false}
        showActiveToggle={true}
        buttonLabel="Add Price"
        onButtonClick={() => setIsModalOpen(true)}
      />
<CategoryManager/>
      {/* Custom Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Price"
        showDropdown={false}
        onSave={() => {
          console.log("Saving P...");
          setIsModalOpen(false);
        }}
      >
        {/* Modal Content */}
        <div className="space-y-4 text-center">
          add your data
        </div>
      </CustomModal>
    </div>
  );
};

export default RoleMaster;
