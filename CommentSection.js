import React from 'react';

const CommentSection = ({ comments, setUserName, setCommentText, commentText, postComment }) => {
  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments.map((comment) => (
          <div key={comment.timestamp}>
            <p><strong>{comment.userName}:</strong> {comment.commentText}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Your name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Leave a comment"
      />
      <button onClick={postComment}>Post Comment</button>
    </div>
  );
};

export default CommentSection;
