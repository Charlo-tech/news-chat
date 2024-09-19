import axios from 'axios';

export const fetchNews = async () => {
  try {
    const response = await axios.get('http://api.mediastack.com/v1/news', {
      params: {
        access_key: process.env.MEDIASTACK_API_KEY, 
        countries: 'us, ke, gb', 
        languages: 'en', 
        categories: 'technology',
        limit: 20 
      }
    });

    return response.data.data; 
  } catch (error) {
    if (error.response) {
      console.error('API error:', error.response.data);
    } else if (error.request) {
      console.error('No response from API:', error.request);
    } else {
      console.error('Axios error:', error.message);
    }
    throw new Error('Failed to fetch news');
  }
};