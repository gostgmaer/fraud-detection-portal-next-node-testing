import React, { useState } from "react";

const TaxonomyField = ({label,selectedTaxonomy, setSelectedTaxonomy}) => {
  const [inputValue, setInputValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(selectedTaxonomy);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const term = inputValue.trim();
      if (term) {
        if (term && !selectedTaxonomy.includes(term)) {
          setSelectedTaxonomy([...selectedTaxonomy, term]);
          setInputValue("");
          setErrorMessage("");
        } else {
          setErrorMessage("Duplicate Value not allow");
        }
      }
    }
  };

  const handleRemoveClick = (index) => {
    const updatedValues = [...selectedTaxonomy];
    updatedValues.splice(index, 1);
    setSelectedTaxonomy(updatedValues);
  };

  return (
    <div className="">
      <label className="block text-gray-700 text-sm font-bold mb-2">
       {label}
      </label>
      <div className=" mt-2 flex-wrap space-x-2">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={inputValue}
          placeholder={label}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="mt-2">
        <p className="error text-red-500 text-xs font-medium my-1">{errorMessage}</p>
        <div className="flex justify-start items-center gap-3 flex-wrap">
          {selectedTaxonomy.map((option, index) => (
            <div key={option} className="relative">
              <div className="flex justify-start">
                <span className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-sm cursor-pointer">
                  {option}
                </span>
                <button
                  className="ml-1 text-red-600"
                  onClick={() => handleRemoveClick(index)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxonomyField;
