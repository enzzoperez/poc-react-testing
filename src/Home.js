import React from "react";

const Home = ({ history }) => {
  const [postId, setPostId] = React.useState("");
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Search for a post by its ID</h2>

      <label htmlFor="postId">Post ID: </label>
      <input
        id="postId"
        value={postId}
        placeholder='Ingrese numero de id'
        onChange={(e) => setPostId(e.target.value)}
      />
      <button
        disabled={!postId}
        onClick={() => history.push(`/post/${postId}`)}
      >
        Submit
      </button>
    </div>
  );
};

export default Home;
