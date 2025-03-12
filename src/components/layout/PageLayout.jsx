import { useSidebar } from '../../context/SidebarContext';
import Breadcrumb from '../Breadcrumb';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import bannerImage from '../../assets/gold.webp'
function PageLayout() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className={`flex flex-col flex-1 transition-all duration-350 ${isCollapsed ? 'ml-14' : 'ml-72'}`}>
        <Header />
        <div className="flex-1 overflow-auto p-4">
          <Breadcrumb  backgroundImage={bannerImage} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PageLayout;
