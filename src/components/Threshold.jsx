import { motion } from "framer-motion";

const Threshold = ({ title, value, icon, bgColor, textColor, change, changeType }) => {
  return (
    <motion.div
      whileHover={{ scale: 1 }}
      className={`p-5 rounded-xl shadow-md flex flex-col justify-between transition-all ${
        bgColor ? bgColor : "bg-white"
      } w-full sm:w-[200px] md:w-[220px] lg:w-[287px]`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-full ${bgColor ? "bg-white/20" : "bg-gray-100"}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${textColor}`}>{title}</span>
      </div>

      <div className="mt-2 flex items-end justify-between">
        <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
        <span className={`text-sm font-medium ${changeType === "up" ? "text-green-500" : "text-red-500"}`}>
          {change} {changeType === "up" ? "↑" : "↓"}
        </span>
      </div>
    </motion.div>
  );
};

export default Threshold;
