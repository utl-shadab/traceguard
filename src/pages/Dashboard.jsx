import React from 'react'
import Threshold from '../components/Threshold';
import { LucideAlertCircle, LucideBarcode, LucideQrCode, LucideRotateCcw, } from 'lucide-react';

import QRCodeVolumeChart from '../components/charts/QRCodeVolumeChart';
import DataTable from '../components/Tables/DataTable';
// import CustomTable from '../components/Tables/CustomTable';

const cardData = [
  {
    title: "Issued QR Codes",
    value: "1.2M",
    icon: <LucideBarcode className="text-white" size={24} />,
    bgColor: "bg-blue-600 text-white",
    textColor: "text-white",
    change: "+3.8%",
    changeType: "up",
  },
  {
    title: "Generated QR Codes",
    value: "950k",
    icon: <LucideQrCode className="text-purple-500" size={24} />,
    textColor: "text-black",
    change: "+2.1%",
    changeType: "up",
  },
  {
    title: "Returned QR Codes",
    value: "85k",
    icon: <LucideRotateCcw className="text-yellow-500" size={24} />,
    textColor: "text-black",
    change: "-1.2%",
    changeType: "down",
  },
  {
    title: "Damaged QR Codes",
    value: "47k",
    icon: <LucideAlertCircle className="text-orange-500" size={24} />,
    textColor: "text-black",
    change: "+0.8%",
    changeType: "up",
  },
];

const Dashboard = () => {
  return (
    <div className=''>
      <div className=" bg-gray-100 flex flex-wrap gap-5 justify-start">
        {cardData.map((card, index) => (
          <Threshold key={index} {...card} />
        ))}
      </div>
      <QRCodeVolumeChart />
      <DataTable />
      {/* <CustomTable/> */}
    </div>
  )
}

export default Dashboard
