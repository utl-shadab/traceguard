import { useSidebar } from '../../context/SidebarContext';
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, LucideMail, User, Menu, X } from "lucide-react";
import UserImage from "../../assets/user.webp";

function Header() {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { toggleSidebar, isMobile, isSidebarOpen } = useSidebar();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    { id: 1, title: "Roman Joined the Team!", message: "Congratulate him" },
    { id: 2, title: "New message", message: "Solomon sent you a message" }
  ];

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
    setNotificationOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b py-3 border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none transition-all">
          {isMobile && isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Company name - hide on smallest screens */}
      <div className="text-lg font-semibold text-gray-800 hidden sm:block">BINARIO TECHNOLOGIES</div>
      
      <div className="flex items-center space-x-6">
        
        {/* Notification Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button onClick={toggleNotification} className="relative flex items-center space-x-2 focus:outline-none">
            <div className="relative">
              <div className="w-8 h-8 bg-[#EFF6FF] rounded-full flex items-center justify-center text-gray-700">
                <Bell className="w-5 h-5" />
              </div>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-[2px] w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              )}
            </div>
          </button>
          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] bg-white shadow-lg rounded-lg p-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">Notification</h4>
                  <span className="bg-[#06D6AE] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {notifications.length} new
                  </span>
                </div>
                <div className="mt-2 space-y-2">
                  {notifications.map((item) => (
                    <div key={item.id} className="flex items-start p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                      <img src={UserImage} alt="User" className="w-10 h-10 rounded-full" />
                      <div className="ml-3">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.message}</p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full text-blue-600 font-semibold py-2 border-t">See All Notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button onClick={toggleProfile} className="flex items-center space-x-2 focus:outline-none">
            <img src={UserImage} alt="Profile" className="w-8 h-8 rounded-full border border-gray-300" />
          </button>
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] bg-white shadow-lg rounded-lg p-4"
              >
                <div className="flex items-center mt-3 space-x-4">
                  <img src={UserImage} alt="User" className="w-14 h-14 rounded-full border border-gray-300" />
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">Admin</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <LucideMail className="w-4 h-4 mr-1" /> info@johndoe.com
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-all">
                    <User className="w-5 h-5 text-[#5765F6]" />
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">My Profile</p>
                      <p className="text-sm text-gray-500">Account settings</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 text-[#5765F6] font-semibold py-2 border border-[#5765F6] rounded-lg hover:bg-blue-100 transition-all">
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Header;