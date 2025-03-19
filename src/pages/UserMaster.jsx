import React, { useState } from "react";
import DataTable from "../components/Tables/DataTable";
import CustomModal from "../components/Modal/CustomModal"; 

// Sample Data
const sampleData = [
    {
      id: 50246,
      companyName: "Binario Technologies",
      roleName: "Administrator",
      firstName: "Admin",
      lastName: "Binario",
      mobile: "8768877787",
      email: "info@binario.com",
      active: true,
    },
  ];

// Column Definitions
const sampleColumns = [
    { Header: "ID", accessor: "id" },
    { Header: "Company Name", accessor: "companyName" },
    { Header: "Role Name", accessor: "roleName" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Mobile", accessor: "mobile" },
    { Header: "Email", accessor: "email" },
    { Header: "Active", accessor: "active" },
  ];
const UserMaster = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="">
      <DataTable
        columns={sampleColumns}
        data={sampleData}
        actions={["edit", "delete"]}
        enableCSV={false}
        showDropdown={true}
        showActiveToggle={true}
        buttonLabel="Add "
        onButtonClick={() => setIsModalOpen(true)} 
      />

      {/* Custom Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        title="Add "
        onSave={() => {
          console.log("Saving ...");
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

export default UserMaster;
