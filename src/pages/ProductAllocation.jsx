import React, { useState } from "react";
import DataTable from "../components/Tables/DataTable";
import CustomModal from "../components/Modal/CustomModal";

// Sample Data
const sampleData = [
  {
    id: 80232,
    company: "Binario Technologies",
    product: "Tablets",
    fromNo: 1,
    toNo: 10,
    quantity: 10,
    active: true
  }
];

const sampleColumns = [
  { Header: "ID", accessor: "id" },
  { Header: "Company", accessor: "company" },
  { Header: "Product", accessor: "product" },
  { Header: "From No", accessor: "fromNo" },
  { Header: "To No", accessor: "toNo" },
  { Header: "Quantity", accessor: "quantity" },
  { Header: "Active", accessor: "active" }
];

const ProductAllocation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <DataTable
        columns={sampleColumns}
        data={sampleData}
        actions={["edit"]}
        showDropdown={false}
        enableCSV={false}
        showActiveToggle={true}
        buttonLabel="Add Allocation "
        onButtonClick={() => setIsModalOpen(true)}
      />

      {/* Custom Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Allocation"
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

export default ProductAllocation;
