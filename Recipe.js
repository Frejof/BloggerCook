// src/components/Recipe.js
import React from 'react';

const Recipe = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default Recipe;
