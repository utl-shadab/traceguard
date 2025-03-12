import React, { useState } from "react";
import Chart from "react-apexcharts";

const QRCodeVolumeChart = () => {
  const [selectedRange, setSelectedRange] = useState("year");

  // Data for different time ranges
  const dataOptions = {
    year: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      realScans: [500, 550, 600, 620, 680, 750, 800, 850, 880, 920, 950, 980],
      fakeScans: [50, 70, 90, 100, 120, 130, 140, 150, 170, 180, 190, 200],
    },
    month: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      realScans: [200, 220, 250, 270],
      fakeScans: [30, 40, 50, 55],
    },
    week: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      realScans: [50, 60, 65, 70, 80, 85, 90],
      fakeScans: [10, 12, 14, 16, 18, 20, 22],
    },
    today: {
      categories: ["12 AM", "6 AM", "12 PM", "6 PM"],
      realScans: [10, 15, 20, 25],
      fakeScans: [2, 5, 7, 10],
    },
  };

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
  };

  const options = {
    chart: { type: "line", height: 350, toolbar: { show: false } },
    colors: ["#155DFC", "#EF4444"],
    stroke: { curve: "smooth", width: 3 },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value, { seriesIndex }) =>
          seriesIndex === 0 ? `Real Scans: ${value}` : `Fake Scans: ${value}`,
      },
    },
    markers: { size: 5, hover: { size: 7 } },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: { width: 12, height: 12, radius: 12 },
      labels: { colors: "#333" },
    },
    xaxis: {
      categories: dataOptions[selectedRange].categories,
      labels: { style: { colors: "#666", fontSize: "12px" } },
    },
    yaxis: { labels: { style: { colors: "#666", fontSize: "12px" } } },
    grid: { borderColor: "#E0E0E0", strokeDashArray: 4 },
  };

  const series = [
    { name: "Real Scans", data: dataOptions[selectedRange].realScans },
    { name: "Fake Scans", data: dataOptions[selectedRange].fakeScans },
  ];

  return (
    <div className="bg-white rounded-xl my-5 p-6 shadow-md">
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-lg font-semibold">QR Code Scan Volume</h2>
        <select
          className="text-gray-500 text-sm bg-white border rounded-md px-3 py-1 cursor-pointer outline-none hover:bg-gray-100"
          value={selectedRange}
          onChange={handleRangeChange}
        >
          <option value="year">This Year</option>
          <option value="month">This Month</option>
          <option value="week">This Week</option>
          <option value="today">Today</option>
        </select>
      </div>

      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default QRCodeVolumeChart;
