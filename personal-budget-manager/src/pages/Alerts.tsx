import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard'; 


interface Category {
  _id: string;
  totalSpent: number;
  limit: number;
}

const Alerts: React.FC = () => {
  const [categorySummary, setCategorySummary] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchCategorySummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses/categories/summary');
      setCategorySummary(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching category summary:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorySummary();
  }, []);

  const refreshCategorySummary = () => {
    fetchCategorySummary();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='my-6'>
      <h1 className='text-xl font-bold mb-6'>Category Information</h1>
      <div className="grid grid-cols-3 gap-6"> 
        {categorySummary.map((category) => (
          <CategoryCard
            key={category._id} 
            category={category._id}
            totalSpent={category.totalSpent}
            limit={category.limit}
            onLimitChange={refreshCategorySummary}
          />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
