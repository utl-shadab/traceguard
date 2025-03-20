import React from "react";

const AccessList = ({ selectedCategories, categories }) => {
  // Extract selected category & subcategory names
  const selectedNames = categories
    .flatMap((cat) => [
      selectedCategories.includes(cat.id) ? cat.name : null,
      ...cat.subcategories
        .filter((sub) => selectedCategories.includes(sub.id))
        .map((sub) => sub.name),
    ])
    .filter(Boolean);

  return (
    <div className="bg-white p-4 rounded-lg  w-full border-2 border-gray-200  min-h-[100px] flex flex-col">
      {/* Selected Pages Title */}
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h3 className="text-lg font-semibold">
          Selected Pages:{" "}
          {selectedNames.length === 0 ? (
            <span className="text-gray-500">none</span>
          ) : (
            ""
          )}
        </h3>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 max-h-96 overflow-y-auto ">
        {selectedNames.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {selectedNames.map((name, index) => (
              <li key={index} className="py-1">{name}</li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Save Button (Right-Aligned) */}
      <div className="flex justify-end mt-4">
        <button className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800">
          ✔ Save
        </button>
      </div>
    </div>
  );
};

export default AccessList;
