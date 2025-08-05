import { memo } from "react";

const Input = memo(
  ({ type, name, value, required, placeholder, onChangeHandler, label ,loading}) => {
    return (
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChangeHandler}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 
                     text-sm sm:text-base md:text-lg lg:text-xl
                     max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          required={required}
          placeholder={placeholder}
          disabled={loading}
        />
      </div>
    );
  }
);

export default memo(Input);

