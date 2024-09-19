import { useEffect, useState } from "react";
import { fetchNews } from '../utils/fetchNews';  // Fetch live news
import { dummyNews } from '../utils/dummyNews';  // Dummy news data
import { Container, Typography, Card, CardContent, CardMedia, List, ListItem, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [useDummyNews, setUseDummyNews] = useState(true);  // Toggle between dummy and live news
    const [newsletter, setNewsletter] = useState("");  // Newsletter content

    // Fetch news on component mount and when toggling between live/dummy news
    useEffect(() => {
        async function getNews() {
            if (useDummyNews) {
                setArticles(dummyNews);  // Use dummy news
            } else {
                try {
                    const news = await fetchNews();  // Fetch live news
                    setArticles(news);
                } catch (error) {
                    console.error("Error fetching news:", error);
                    setArticles(dummyNews);  // Fallback to dummy news in case of failure
                }
            }
        }

        getNews();
    }, [useDummyNews]);

    // Handle chatbot query submission
    const handleQuerySubmit = async () => {
        try {
            const res = await axios.post('/api/chatbot', { query, articles });
            setResponse(res.data.answer);  // Set chatbot response
        } catch (error) {
            console.error('Error querying chatbot:', error);
            setResponse("Sorry, I couldn't find relevant news. Please try again.");
        }
    };

    // Handle newsletter generation
    const handleGenerateNewsletter = async () => {
        try {
            const res = await axios.post('/api/generateNewsletter', { content: articles });
            setNewsletter(res.data.newsletter);  // Set generated newsletter
        } catch (error) {
            console.error('Error generating newsletter:', error);
            setNewsletter("Failed to generate newsletter. Please try again.");
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3" gutterBottom>
                StackUp news desk 2024
            </Typography>

            {/* Toggle Button to switch between Dummy and Live news */}
            <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => setUseDummyNews(!useDummyNews)} 
                style={{ marginBottom: '20px' }}
            >
                {useDummyNews ? "Fetch Live News" : "Use Dummy News"}
            </Button>

            {/* Display list of news articles */}
            <List>
                {articles.map((article, index) => (
                    <ListItem key={index}>
                        <Card variant="outlined" style={{ width: '100%' }}>
                            {article.image && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={article.image}
                                    alt={article.title}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h5">{article.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {article.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>

            {/* Chatbot Section */}
            <Box mt={4} mb={4}>
                <Typography variant="h4" gutterBottom>
                    Chat with Stackie
                </Typography>
                <TextField
                    sx={{ input: { color: 'white' } }}
                    fullWidth
                    label="Ask me about Stackup"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleQuerySubmit} 
                    style={{ marginTop: '10px' }}
                >
                    Submit
                </Button>

                {/* Display response from chatbot */}
                {response && (
                    <Box mt={2}>
                        <Typography variant="h6">Chatbot Response:</Typography>
                        <Typography variant="body1">{response}</Typography>
                    </Box>
                )}
            </Box>

            {/* Newsletter Generation Section */}
            <Box mt={4} mb={4}>
                <Typography variant="h4" gutterBottom>
                    Generate Newsletter
                </Typography>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleGenerateNewsletter}
                    style={{ marginBottom: '20px' }}
                >
                    Generate Newsletter from News
                </Button>

                {/* Display generated newsletter */}
                {newsletter && (
                    <Box mt={2}>
                        <Typography variant="h6">Generated Newsletter:</Typography>
                        <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                            {newsletter}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
}
