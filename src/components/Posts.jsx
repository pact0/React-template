import axios from "axios";
import React, { useState, useEffect } from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function Posts() {
  const [posts, setPosts] = useState();
  const [post, setPost] = useState({ title: "", body: "", id: "1" });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [post, posts]);

  function createPost() {
    axios
      .post(baseURL, {
        title: "Hello World!",
        body: "This is a new post.",
      })
      .then((response) => {
        setPost(response.data);
      });
  }
  function updatePost() {
    axios
      .put(`${baseURL}/1`, {
        title: "Hello World!",
        body: "This is an updated post.",
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      });
  }

  if (!posts) return null;


  return (
    <div>
      <div>
        <button onClick={updatePost}>Update Post</button>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
      <div>
        {posts.slice(0, 5).map((post) => {
          return (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
