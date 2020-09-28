import React from "react";
import {  Link } from "react-router-dom";
import { fetchPost } from "./api";

const Post = ({ match }) => {
  const { postId } = match.params;
  const [post, setPost] = React.useState();

  const myFetch = async (postId) => {
    setPost(await fetchPost(postId));
  }

  React.useEffect(() => {
    myFetch(postId)
  }, [postId]);


  return (
    <div>
      <h1>Post {postId}</h1>
      {!post ? (
        <p>Loading ...</p>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Post