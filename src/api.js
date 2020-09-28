export const fetchPost = async postId => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return response.json();
  };
  