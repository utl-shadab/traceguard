import { useSidebar } from "../../context/SidebarContext";
import Breadcrumb from "../Breadcrumb";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import bannerImage from "../../assets/gold.webp";

function PageLayout() {
  const { isCollapsed, isMobileOpen } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-14" : "w-72"
        } fixed md:relative h-full`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => toggleMobileSidebar()}
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isCollapsed ? "md:w-[calc(100%-3.5rem)]" : "md:w-[calc(100%-18rem)]"
        } w-full`}
      >
        <Header />
        <div className="flex-1 overflow-auto px-4 py-6">
          <Breadcrumb backgroundImage={bannerImage} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PageLayout;
