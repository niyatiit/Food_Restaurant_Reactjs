import React, { useState, useEffect } from 'react';

const Meal = () => {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);

  const fetchMeals = async (query) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setMeals(data.meals || []); // Update to handle cases where no meals are found
    } catch (error) {
      console.error('Error fetching the meals:', error);
    }
  };

  useEffect(() => {
    fetchMeals(''); // Fetch all meals initially
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchMeals(e.target.value);
  };

  return (
    <>
      <div id="main">
        <div className='heading'>
          <h1>Search Your Food Recipe</h1>
          <p>💖😋❤️ Welcome to My Food Restaurant 💖😋❤️</p>
        </div>
        <div className='input_type'>
          <input
            type='search'
            value={search}
            onChange={handleSearch}
            placeholder='Enter the Food.'
          />
        </div>
        <div className='image_part'>
          {meals.length > 0 ? (
            meals.map((meal, index) => (
              <div className='img' key={index}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <div className='overlay'>
                  <h2 className='text'>{meal.strMeal}</h2>
                  <h3>{meal.strArea}</h3>
                  <p className='text'>{meal.strInstructions.slice(0, 100)}...</p>
                </div>
              </div>
            ))
          ) : (
            <p>No meals found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Meal;
