import React, { useState } from "react";

interface CategoryCardProps {
  category: string;
  totalSpent: number;
  limit: number;
  onLimitChange: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  totalSpent,
  limit,
  onLimitChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLimit, setNewLimit] = useState(limit);

  const handleLimitChange = async () => {
    try {
      await fetch(`http://localhost:5000/api/expenses/categories/limit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, limit: newLimit }),
      });
      setIsEditing(false);
      onLimitChange();
    } catch (error) {
      console.error("Error updating limit:", error);
    }
  };

  const percentageUsed = limit > 0 ? (totalSpent / limit) * 100 : 0;

  return (
    <div className="border rounded-lg shadow-lg bg-white p-4 transition-transform transform hover:scale-95">
      <h2 className="text-lg font-bold text-gray-800">{category}</h2>
      <div className="mt-2 flex justify-between mr-10">
        <div>
          <p className="text-gray-600">Total Spent:</p>
          <p className="text-base font-semibold text-gray-900">{totalSpent}$</p>
        </div>
        <div>
          <p className="text-gray-600">Limit:</p>
          <p className="text-base font-semibold text-gray-900">
            {limit || "Not Set"}$
          </p>
        </div>
      </div>

      {limit > 0 && percentageUsed >= 80 ? (
        <p className="text-red-600 font-semibold mt-4">
          Alert: You have reached {percentageUsed.toFixed(2)}% of your limit!
        </p>
      ) : (
        <p className="text-blue-600 mt-4">
          You are at {percentageUsed.toFixed(2)}% of your limit.
        </p>
      )}

      {isEditing ? (
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={newLimit}
            onChange={(e) => setNewLimit(Number(e.target.value))}
            className="border rounded-l p-2 flex-1 w-2/3"
            placeholder="Set new limit"
          />
          <button
            onClick={handleLimitChange}
            className="bg-blue-500 text-white p-2 rounded-r"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-700 p-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-[#1677FF] text-white p-2 rounded mt-4"
        >
          Edit Limit
        </button>
      )}
    </div>
  );
};

export default CategoryCard;
