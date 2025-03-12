import React from "react";
import CustomTable from "../Tables/CustomTable";

const companyData = [
  { id: 1, name: "Binario Technologies", displayName: "Binario Technologies", prefix: "BT", active: true },
];

const companyColumns = [
  { Header: "ID", accessor: "id" },
  { Header: "Company Name", accessor: "name" },
  { Header: "Company Display Name", accessor: "displayName" },
  { Header: "Prefix", accessor: "prefix" },
  { Header: "Active", accessor: "active" },
];

const CompanyTable = () => {
  return (
    <CustomTable
      columns={companyColumns}
      data={companyData}
      title="Company"
      onAdd={() => alert("New Company Added")}
    />
  );
};

export default CompanyTable;
