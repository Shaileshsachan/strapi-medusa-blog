import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';



const AddBlog = () => {
    const router = useRouter();
    require('dotenv').config({ path: '.env.local' });


    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        author: ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = 'b2de8442845232c769a7d2109e877c3040c30d4a4b400f7a6bcb57d8e0dd01c23c50d0819e61db535a1b3a93f91623230e83379b5ca31fb0ae2795a9704d675616f0e7a910a3ee1c9062d9f3128acad48d2e1decbae09107d1f20f031ec200050138d7c03f19e2f63b45aef1f4d2b004caf840681f802d6aabf7c129b18ce2eb';

            var formDataa = JSON.stringify(
                {
                    'data' : {
                        'title': formData.author,
                        'content': formData.content,
                        'image': formData.imageUrl,
                        'title': formData.title,
                    }
                }
            )

            const response = await axios.post('http://localhost:1337/api/abouts', formDataa, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log('Blog post created:', response.data);
            window.alert("Blog created")
            router.push('/blog')
        } catch (error) {
            console.error('Error creating blog post:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create a New Blog Post</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        id="custom-file"
                        label="Choose image"
                        custom
                        onChange={handleImageChange}
                    />
                </Form.Group>

                <Form.Group controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter author name"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddBlog;
