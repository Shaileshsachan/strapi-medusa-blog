import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'b2de8442845232c769a7d2109e877c3040c30d4a4b400f7a6bcb57d8e0dd01c23c50d0819e61db535a1b3a93f91623230e83379b5ca31fb0ae2795a9704d675616f0e7a910a3ee1c9062d9f3128acad48d2e1decbae09107d1f20f031ec200050138d7c03f19e2f63b45aef1f4d2b004caf840681f802d6aabf7c129b18ce2eb';
        const apiurl = `http://localhost:1337/api/abouts/${postId}?populate=*`;
        const response = await axios.get(apiurl, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.data && response.data.data) {
          const postData = response.data.data; // Get the post data from the response
          const formattedPost = {
            id: postData.id,
            title: postData.attributes.Title,
            content: postData.attributes.Content,
            author: postData.attributes.Author,
            createdAt: new Date(postData.attributes.createdAt).toLocaleDateString(),
            updatedAt: new Date(postData.attributes.updatedAt).toLocaleDateString(),
            imageUrl: postData.attributes.Image.data.attributes.url,
          };
          setPost(formattedPost);
        } else {
          console.error('Invalid API response format:', response);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Blog post not found.</p>;
  }

  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="mb-4">{post.title}</h1>
          <p className="text-muted">Published on: {post.createdAt}</p>
          <img
            src={'http://localhost:1337' + post.imageUrl}
            alt={post.title}
            className="img-fluid mb-4 rounded"
            style={{ maxWidth: '400px', maxHeight: '400px' }}
          />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-5">
            <h2>Author</h2>
            <p>{post.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BlogPostDetail;
