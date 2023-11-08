const fetchData = async () => {
    try {
      const query = qs.stringify({
        populate: '*',
        fields: '*',
        publicationState: 'live',
        locale: ['en', 'de'],
      }, {
        encodeValuesOnly: true, // prettify url
      });
  
      const apiUrl = `http://localhost:1337/api/abouts/api/settings-header?${query}`;
      const response = await axios.get(apiUrl);
  
      if (response.data && Array.isArray(response.data)) {
        const posts = response.data.map(post => ({
          id: post.id,
          author: post.author, // Replace with the actual key for the author field in your API response
          title: post.title, // Replace with the actual key for the title field in your API response
          content: post.content, // Replace with the actual key for the content field in your API response
          image: post.image.url, // Replace 'image' with the actual key for the image field in your API response
          createdAt: new Date(post.created_at).toLocaleDateString(), // Replace 'created_at' with the actual key for the created date field in your API response
          updatedAt: new Date(post.updated_at).toLocaleDateString(), // Replace 'updated_at' with the actual key for the updated date field in your API response
        }));
  
        setBlogPosts(posts);
      } else {
        console.error('Invalid API response format:', response);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };