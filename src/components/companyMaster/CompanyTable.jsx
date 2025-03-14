import React, { useEffect, useState } from "react";
import CustomTable from "../Tables/CustomTable";

// const companyData = [
//   { id: 1, name: "Binario Technologies", displayName: "Binario Technologies", prefix: "BT", active: true },
// ];

const companyColumns = [
  { Header: "ID", accessor: "id" },
  { Header: "Company Name", accessor: "name" },
  { Header: "Company Display Name", accessor: "displayName" },
  { Header: "Prefix", accessor: "prefix" },
  { Header: "Active", accessor: "active" },
];

const CompanyTable = () => {

  const [updateTable, setUpdateTable] = useState(false);
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {

    const storedData = localStorage.getItem("companyData");

    if (storedData) {
      setCompanyData(JSON.parse(storedData));
    }
    else {
      setCompanyData([]);
    }
  }, [updateTable]);

  return (
    <CustomTable
      columns={companyColumns}
      data={companyData}
      setUpdateTable={setUpdateTable}
      updateTable={updateTable}
      title="Company"
      onAdd={() => alert("New Company Added")}
    />
  );
};

export default CompanyTable;
