import React, { useState } from "react";
import Chart from "react-apexcharts";

const VolumeChart = () => {
  const [selectedRange, setSelectedRange] = useState("year");

  // Data for different time ranges
  const dataOptions = {
    year: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      incoming: [40, 35, 50, 30, 45, 70, 60, 55, 65, 50, 60, 55],
      answered: [30, 20, 40, 50, 30, 50, 40, 45, 50, 55, 50, 45],
    },
    month: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      incoming: [60, 70, 80, 90],
      answered: [50, 65, 70, 80],
    },
    week: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      incoming: [15, 20, 30, 35, 25, 40, 50],
      answered: [10, 15, 25, 30, 20, 35, 45],
    },
    today: {
      categories: ["12 AM", "6 AM", "12 PM", "6 PM"],
      incoming: [5, 15, 20, 30],
      answered: [3, 10, 15, 25],
    },
  };

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
  };

  const options = {
    chart: { type: "line", height: 350, toolbar: { show: false } },
    colors: ["#2563EB", "#A855F7"],
    stroke: { curve: "smooth", width: 3 },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value, { seriesIndex }) =>
          seriesIndex === 0 ? `Incoming Calls: ${value}k` : `Answered Calls: ${value}k`,
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
    { name: "Incoming Calls", data: dataOptions[selectedRange].incoming },
    { name: "Answered Calls", data: dataOptions[selectedRange].answered },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-lg font-semibold">Overall Calls Volume</h2>

        {/* Dropdown for Selecting Time Range */}
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

export default VolumeChart;
