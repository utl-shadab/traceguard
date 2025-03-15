import { useState } from "react";

const categoriesData = [
  {
    id: "product-config",
    name: "Product Config",
    subcategories: [
      { id: "product-master", name: "Product Master" },
      { id: "price-master", name: "Price Master" },
      { id: "category-master", name: "Category Master" },
      { id: "product-allocation", name: "Product Allocation" },
      { id: "product-details", name: "Product Details" },
    ],
  },
  {
    id: "administration",
    name: "Administration",
    subcategories: [
      { id: "user-master", name: "User Master" },
      { id: "role-master", name: "Role Master" },
      { id: "customer-user-master", name: "Customer User Master" },
      { id: "customer-master", name: "Customer Master" },
      { id: "customer-mapping", name: "Customer Mapping" },
    ],
  },
  {
    id: "loyalty-management",
    name: "Loyalty Management",
    subcategories: [
      { id: "loyalty-scheme-master", name: "Loyalty Scheme Master" },
      { id: "scheme-product-mapping", name: "Scheme Product Mapping" },
      { id: "catalogue-master", name: "Catalogue Master" },
      { id: "lucky-draw", name: "Lucky Draw" },
      { id: "redemption-approval", name: "Redemption Approval" },
    ],
  },
  {
    id: "data-management",
    name: "Data Management",
    subcategories: [
      { id: "qr-code-return", name: "QR-Code Return" },
      { id: "qr-code-damage", name: "QR-Code Damage" },
    ],
  },
  {
    id: "manage-warranty",
    name: "Manage Warranty",
    subcategories: [
      { id: "warranty-registration", name: "Warranty Registration" },
      { id: "warranty-approval", name: "Warranty Approval" },
      { id: "warranty-enquiry", name: "Warranty Enquiry" },
    ],
  },
  {
    id: "order-packing",
    name: "Order Packing",
    subcategories: [
      { id: "carton-size-master", name: "Carton Size Master" },
      { id: "carton-slip", name: "Carton Slip" },
      { id: "new-order", name: "New Order" },
      { id: "packing", name: "Packing" },
      { id: "dispatch", name: "Dispatch" },
      { id: "damage-carton", name: "Damage Carton" },
    ],
  },
  {
    id: "reports",
    name: "Reports",
    subcategories: [
      { id: "order-report", name: "Order Report" },
      { id: "stock-report", name: "Stock Report" },
      { id: "verification-reports", name: "Verification Reports" },
      { id: "warranty-report", name: "Warranty Report" },
      { id: "feedback-report", name: "FeedBack Report" },
      { id: "redeem-log-report", name: "Redeem Log Report" },
      { id: "loyalty-log-report", name: "Loyalty Log Report" },
    ],
  },
];

const useAccess = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId, ...getSubcategoryIds(categoryId)]
    );
  };

  const toggleSubcategory = (subcategoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const selectCompany = (company) => {
    setSelectedCompany(company);
  };

  // Get all subcategory IDs of a category
  const getSubcategoryIds = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    return category ? category.subcategories.map((sub) => sub.id) : [];
  };

  return {
    selectedCategories,
    toggleCategory,
    toggleSubcategory,
    selectedCompany,
    selectCompany,
    categoriesData,
    setSelectedCategories,
  };
};

export default useAccess;
