// components/News.js
import { useState } from 'react';
import { dummyNews } from '../utils/dummyNews';
import { Container, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';

const News = () => {
  const [articles] = useState(dummyNews);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Latest News
      </Typography>
      <Grid container spacing={4}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={article.imageUrl}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {article.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
