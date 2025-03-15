import { Link, useLocation } from "react-router-dom";
import { LucideHome } from "lucide-react";

const Breadcrumb = ({ title, backgroundImage }) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  return (
    <div
      className="flex items-center justify-between p-6 rounded-lg bg-[#06D6AE] mb-5 shadow-md w-full"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "contain", backgroundPosition: "right", backgroundRepeat: "no-repeat" }}
    >
      <div>
        {/* Page Title */}
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-gray-600 text-sm mt-1" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            {/* Home Link */}
            <li>
              <Link to="/" className="flex items-center hover:text-blue-600">
                <LucideHome className="w-4 h-4 mr-1" />
                Home
              </Link>
            </li>

            {/* Dynamic Breadcrumb Items */}
            {paths.map((path, index) => {
              const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
              const isLast = index === paths.length - 1;
              const formattedPath = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "); // Capitalize & format

              return (
                <li key={fullPath} className="flex items-center">
                  {/* Separator */}
                  <span className="mx-1">•</span>

                  {isLast ? (
                    <span className="font-medium text-gray-800">{formattedPath}</span>
                  ) : (
                    <Link to={fullPath} className="hover:text-blue-600">
                      {formattedPath}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
