import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import Dashboard from './pages/Dashboard';
import AdminRights from './pages/AdminRights';
import ProductConfig from './pages/ProductConfig';
import ProductMaster from './pages/ProductMaster';
import PriceMaster from './pages/PriceMaster';
import CategoryMaster from './pages/CategoryMaster';
import ProductAllocation from './pages/ProductAllocation';
import ProductDetails from './pages/ProductDetails';
import LoyaltyManagement from './pages/LoyaltyManagement';
import DataManagement from './pages/DataManagement';
import ManageWarranty from './pages/ManageWarranty';
import CompanyMaster from './pages/CompanyMaster';
import CompanyAccess from './pages/CompanyAccess';
import LoyaltySchemeMaster from './pages/LoyaltySchemeMaster';
import SchemeProductMapping from './pages/SchemeProductMapping';
import CatalogueMaster from './pages/CatalogueMaster';
import LuckyDraw from './pages/LuckyDraw';
import RedemptionApproval from './pages/RedemptionApproval';
import IssueNumber from './pages/IssueNumber';
import GenerateNumbers from './pages/GenerateNumbers';
import QRCodeReturn from './pages/QRCodeReturn';
import QRCodeDamage from './pages/QRCodeDamage';
import WarrantyRegistration from './pages/WarrantyRegistration';
import WarrantyApproval from './pages/WarrantyApproval';
import WarrantyEnquiry from './pages/WarrantyEnquiry';
import Login from './pages/Login';

function PrivateRoute() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<PageLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin-rights" element={<AdminRights />} />
          <Route path="/product-config" element={<ProductConfig />} />
          <Route path="/product-master" element={<ProductMaster />} />
          <Route path="/price-master" element={<PriceMaster />} />
          <Route path="/category-master" element={<CategoryMaster />} />
          <Route path="/product-allocation" element={<ProductAllocation />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/loyalty-management" element={<LoyaltyManagement />} />
          <Route path="/data-management" element={<DataManagement />} />
          <Route path="/manage-warranty" element={<ManageWarranty />} />
          <Route path="/company-master" element={<CompanyMaster />} />
          <Route path="/company-access" element={<CompanyAccess />} />
          <Route path="/loyalty-scheme-master" element={<LoyaltySchemeMaster />} />
          <Route path="/scheme-product-mapping" element={<SchemeProductMapping />} />
          <Route path="/catalogue-master" element={<CatalogueMaster />} />
          <Route path="/lucky-draw" element={<LuckyDraw />} />
          <Route path="/redemption-approval" element={<RedemptionApproval />} />
          <Route path="/issue-number" element={<IssueNumber />} />
          <Route path="/generate-numbers" element={<GenerateNumbers />} />
          <Route path="/qr-code-return" element={<QRCodeReturn />} />
          <Route path="/qr-code-damage" element={<QRCodeDamage />} />
          <Route path="/warranty-registration" element={<WarrantyRegistration />} />
          <Route path="/warranty-approval" element={<WarrantyApproval />} />
          <Route path="/warranty-enquiry" element={<WarrantyEnquiry />} />
        </Route>
      </Route>
      
      {/* Redirect unknown routes to Dashboard */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
