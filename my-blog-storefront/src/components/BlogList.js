import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';


const BlogList = () => {
    const router = useRouter();
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    require('dotenv').config({ path: '.env.local' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = 'b2de8442845232c769a7d2109e877c3040c30d4a4b400f7a6bcb57d8e0dd01c23c50d0819e61db535a1b3a93f91623230e83379b5ca31fb0ae2795a9704d675616f0e7a910a3ee1c9062d9f3128acad48d2e1decbae09107d1f20f031ec200050138d7c03f19e2f63b45aef1f4d2b004caf840681f802d6aabf7c129b18ce2eb';
                const apiUrl = `http://localhost:1337/api/abouts?populate=*`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                if (response.data && Array.isArray(response.data.data)) {
                    const posts = response.data.data.map(post => {
                        const imageUrl = post.attributes.Image.data.attributes.url;
                        console.log(imageUrl)
                        return {
                            id: post.id,
                            title: post.attributes.Title,
                            content: post.attributes.Content,
                            author: post.attributes.Author,
                            createdAt: new Date(post.attributes.createdAt).toLocaleDateString(),
                            updatedAt: new Date(post.attributes.updatedAt).toLocaleDateString(),
                            imageUrl: imageUrl,
                        };
                    });

                    setBlogPosts(posts);
                    console.log(posts)
                } else {
                    console.error('Invalid API response format:', response);
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this blog post?');
        if (!confirmDelete) {
            return;
        }

        try {
            const token = 'b2de8442845232c769a7d2109e877c3040c30d4a4b400f7a6bcb57d8e0dd01c23c50d0819e61db535a1b3a93f91623230e83379b5ca31fb0ae2795a9704d675616f0e7a910a3ee1c9062d9f3128acad48d2e1decbae09107d1f20f031ec200050138d7c03f19e2f63b45aef1f4d2b004caf840681f802d6aabf7c129b18ce2eb';
            const apiUrl = `http://localhost:1337/api/abouts/${id}`;
            const response = await axios.delete(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                alert(`Blog Deleted`);
                // router.push('/blog')
                window.location.reload()
            } else {
                console.error(`Failed to delete blog. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error in deleting:', error);
            alert(`Failed to delete blog. Please try again later.`);
        }
    };





    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container className='mt-4'>
    <div className="d-flex justify-content-between mb-3">
        <Button className="btn btn-primary">
                <Link href="http://localhost:1337/admin/content-manager/collectionType/api::about.about/create">
                {/* <Link href="/add"> uncomment to use add api */}
                <Button className="text-white btn btn-primary">Add Blog</Button>
            </Link>
        </Button>
    </div>
    <Row>
        {blogPosts.map((post) => (
            <Col key={post.id} md={4} className="mb-4">
                <Link href={`${post.id}`}>
                    <Card style={{ cursor: 'pointer', minHeight: '100%' }}>
                        <Card.Img variant="top" src={'http://localhost:1337' + post.imageUrl} alt={post.title} />
                        <Card.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div>
                                <Card.Title>{post.title}</Card.Title>
                            </div>
                            <div style={{ cursor: 'pointer' }} onClick={() => handleDelete(post.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        ))}
    </Row>
</Container>

    );
};

export default BlogList;
