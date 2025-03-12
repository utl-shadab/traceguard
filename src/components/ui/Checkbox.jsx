import { motion } from "framer-motion";

const Checkbox = ( { checked, onChange, color = "blue" }) => {
   
  return (
    <div
      className={`relative w-6 h-6 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all duration-300 
        ${checked ? `bg-${color}-500 border-${color}-500` : "border-gray-400"}
      `}
      onClick={() => onChange(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        className="absolute opacity-0 w-full h-full cursor-pointer"
      />

      {checked && (
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute text-white w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </motion.svg>
      )}
    </div>
  );
};

export default Checkbox;
