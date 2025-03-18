import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LucideHome,
  LucideBuilding,
  LucideBox,
  LucideUsers,
  LucideTag,
  LucideDatabase,
  LucideShieldCheck,
  LucideLogOut,
  LucideSettings,
  LucideChevronDown,
  LucideChevronRight,
  LogIn,
  X,
} from "lucide-react";
import UserImage from "../../assets/user.webp";
import { useSidebar } from "../../context/SidebarContext";
import Logo from "../../assets/logo.webp";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <LucideHome size={20} />,
  },
  {
    id: "admin-rights",
    label: "Admin Rights",
    path: "#",
    icon: <LucideShieldCheck size={20} />,
    submenu: [
      {
        id: "company-master",
        label: "Company Master",
        path: "/company-master",
      },
      {
        id: "company-access",
        label: "Company Access",
        path: "/company-access",
      },
    ],
  },
  {
    id: "product-config",
    label: "Product Config",
    path: "#",
    icon: <LucideBox size={20} />,
    submenu: [
      {
        id: "product-master",
        label: "Product Master",
        path: "/product-master",
      },
      { id: "price-master", label: "Price Master", path: "/price-master" },
      {
        id: "category-master",
        label: "Category Master",
        path: "/category-master",
      },
      {
        id: "product-allocation",
        label: "Product Allocation",
        path: "/product-allocation",
      },
      {
        id: "product-details",
        label: "Product Details",
        path: "/product-details",
      },
    ],
  },
  {
    id: "loyalty-management",
    label: "Loyalty Management",
    path: "#",
    icon: <LucideTag size={20} />,
    submenu: [
      {
        id: "loyalty-scheme-master",
        label: "Loyalty Scheme Master",
        path: "/loyalty-scheme-master",
      },
      {
        id: "scheme-product-mapping",
        label: "Scheme Product Mapping",
        path: "/scheme-product-mapping",
      },
      {
        id: "catalogue-master",
        label: "Catalogue Master",
        path: "/catalogue-master",
      },
      { id: "lucky-draw", label: "Lucky Draw", path: "/lucky-draw" },
      {
        id: "redemption-approval",
        label: "Redemption Approval",
        path: "/redemption-approval",
      },
    ],
  },
  {
    id: "data-management",
    label: "Data Management",
    path: "#",
    icon: <LucideDatabase size={20} />,
    submenu: [
      { id: "issue-number", label: "Issue Number", path: "/issue-number" },
      {
        id: "generate-numbers",
        label: "Generate Numbers",
        path: "/generate-numbers",
      },
      {
        id: "qr-code-return",
        label: "QR-Code Return",
        path: "/qr-code-return",
      },
      {
        id: "qr-code-damage",
        label: "QR-Code Damage",
        path: "/qr-code-damage",
      },
    ],
  },
  {
    id: "manage-warranty",
    label: "Manage Warranty",
    path: "#",
    icon: <LucideSettings size={20} />,
    submenu: [
      {
        id: "warranty-registration",
        label: "Warranty Registration",
        path: "/warranty-registration",
      },
      {
        id: "warranty-approval",
        label: "Warranty Approval",
        path: "/warranty-approval",
      },
      {
        id: "warranty-enquiry",
        label: "Warranty Enquiry",
        path: "/warranty-enquiry",
      },
    ],
  },
];

function Sidebar() {
  const { isCollapsed, isMobile, isSidebarOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  // Close any open submenus when sidebar collapses
  useEffect(() => {
    if (isCollapsed) {
      setOpenMenu(null);
    }
  }, [isCollapsed]);

  // Handle sidebar visibility and size based on device
  const sidebarWidth = isCollapsed ? "w-14" : "w-72";
  const sidebarVisibility =
    isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0";

  return (
    <div
      className={`bg-white text-black fixed h-full flex flex-col justify-between transition-all duration-300 ease-in-out z-50 ${sidebarWidth} ${sidebarVisibility}`}>
      {/* Mobile close button - shown only on mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <>
          <button
            onClick={toggleSidebar}
            className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close sidebar">
            <X size={20} />
          </button>
        </>
      )}

      <div>
        <div
          className={`flex ${
            isCollapsed ? "h-14" : "h-20"
          } items-center justify-center ${
            isMobile ? "border-none mt-16" : ""
          } border-b border-gray-300`}>
          <div className={`flex items-center justify-center px-4 `}>
            <img
              src={Logo}
              alt="Logo"
              className={`transition-all duration-300 ease-in-out ${
                isCollapsed ? "w-10 h-10 object-cover" : "w-20"
              }`}
            />
          </div>
        </div>

        <div
          className={`py-1 h-[calc(100vh-13rem)] ${
            !isCollapsed ? "overflow-y-auto" : ""
          }`}>
          <ul className="space-y-3 px-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isOpen = openMenu === item.id;

              return (
                <li key={item.id} className="relative">
                  {hasSubmenu ? (
                    <button
                      className={`flex items-center justify-between p-2.5 rounded-md transition-all duration-700 ease-in-out w-full 
                      ${
                        isActive
                          ? "bg-[#5765F6] text-white"
                          : "hover:bg-[#5d87ff20] hover:text-[#5D87FF] text-black"
                      }`}
                      onClick={() => toggleMenu(item.id)}>
                      <div className="flex items-center">
                        {item.icon}
                        {!isCollapsed && (
                          <span className="ml-3">{item.label}</span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <span
                          className={`transition-transform duration-400 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] ${
                            isOpen ? "transform rotate-180" : ""
                          }`}>
                          <LucideChevronDown size={16} />
                        </span>
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center p-2.5 rounded-md transition-all duration-700 ease-in-out w-full ${
                        isActive
                          ? "bg-[#5765F6] text-white"
                          : "hover:bg-[#5d87ff20] hover:text-[#5D87FF] text-black"
                      }`}>
                      {item.icon}
                      {!isCollapsed && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </Link>
                  )}

                  {hasSubmenu && (
                    <ul
                      className={`mt-2 space-y-1 transition-all duration-500 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] ${
                        isOpen
                          ? "max-h-screen opacity-100"
                          : "max-h-0 opacity-0 overflow-hidden"
                      } ${
                        !isCollapsed
                          ? "ml-6"
                          : "absolute top-0 left-full ml-2.5 shadow z-10 bg-white rounded-sm whitespace-nowrap"
                      }`}>
                      {item.submenu.map((subitem) => {
                        const isSubActive = location.pathname === subitem.path;
                        return (
                          <li key={subitem.id}>
                            <Link
                              to={subitem.path}
                              className={`flex items-center p-2 pl-5 rounded-md transition-all duration-600 ease-in-out 
                              ${
                                isSubActive
                                  ? "bg-[#5D87FF] text-white"
                                  : "hover:bg-[#5d87ff20] hover:text-[#5D87FF] text-black"
                              }`}>
                              <span
                                className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ease-in-out ${
                                  isSubActive ? "bg-white" : "bg-gray-400"
                                }`}></span>
                              {subitem.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* User Profile Section (Bottom Fixed) */}
      <div className="p-3">
        {!isCollapsed ? (
          <div className="flex items-center bg-[#06D6AE] p-2 rounded-lg">
            <img
              src={UserImage}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <h4 className="text-black font-medium">John Doe</h4>
              <p className="text-gray-500 text-sm">Admin</p>
            </div>
            <Link
              to="/login"
              className="ml-auto text-black hover:text-blue-700">
              <LucideLogOut size={20} />
            </Link>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center justify-center w-full p-2 rounded-lg text-black hover:bg-[#5d87ff20] hover:text-[#5D87FF]">
            <LucideLogOut size={24} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
