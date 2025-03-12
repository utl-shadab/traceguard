import { useState } from "react";
import { LucideCheckCircle, LucideXCircle } from "lucide-react";

function InputField({ type, placeholder, value, onChange, icon: Icon, validate = () => true }) {
  const [touched, setTouched] = useState(false);
  const isValid = validate(value); // Now, `validate` is always a function
  const isInvalid = touched && !isValid;

  return (
    <div className="relative w-full">
      {/* Left Icon */}
      {Icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </span>
      )}

      {/* Input Field */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
          setTouched(true);
        }}
        onBlur={() => setTouched(true)}
        className={`w-full px-4 py-2 pl-10 pr-10 border rounded-md focus:outline-none transition-all 
          ${isInvalid ? "border-red-500 focus:ring-red-400" : isValid ? "border-green-500 focus:ring-green-400" : "border-gray-300 focus:ring-blue-400"}`}
      />

      {/* Right Icon (Validation) */}
      {touched && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isValid ? (
            <LucideCheckCircle size={18} className="text-green-500" />
          ) : (
            <LucideXCircle size={18} className="text-red-500" />
          )}
        </span>
      )}

      {/* Error Message */}
      {isInvalid && <p className="text-red-500 text-xs mt-1">Invalid {placeholder.toLowerCase()}</p>}
    </div>
  );
}

export default InputField;
