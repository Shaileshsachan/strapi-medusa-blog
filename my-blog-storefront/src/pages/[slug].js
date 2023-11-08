import React from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogPostDetail from '../components/BlogPostDetail';

const BlogDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <BlogPostDetail postId={slug} />;
};

export default BlogDetail;
