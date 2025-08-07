```javascript
// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from './components/Recipe';
import CommentSection from './components/CommentSection';

const App = () => {
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');

  const fetchRecipe = async (day) => {
    const response = await axios.get(`http://localhost:5000/api/recipe/${day}`);
    setRecipe(response.data);
  };

  const fetchComments = async (recipeId) => {
    const response = await axios.get(`http://localhost:5000/api/comments/${recipeId}`);
    setComments(response.data);
  };

  const postComment = async () => {
    const response = await axios.post('http://localhost:5000/api/comments', {
      recipeId: recipe.day,
      userName,
      commentText,
    });
    setComments([response.data, ...comments]);
    setCommentText('');
  };

  useEffect(() => {
    fetchRecipe('day1');
  }, []);

  useEffect(() => {
    if (recipe) {
      fetchComments(recipe.day);
    }
  }, [recipe]);

  return (
    <div className="App">
      <h1>Daily Recipe Blog</h1>
      {recipe && <Recipe recipe={recipe} />}
      {recipe && (
        <CommentSection
          comments={comments}
          setUserName={setUserName}
          setCommentText={setCommentText}
          commentText={commentText}
          postComment={postComment}
        />
      )}
    </div>
  );
};

export default App;
