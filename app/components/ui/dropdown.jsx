import { useState } from 'react';

const Dropdown = ({ options, label, onSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
      >
        {selectedOption ? selectedOption : label}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-10 opacity-100 transition-all duration-200 ease-in-out transform scale-100">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md transition-colors duration-200"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
