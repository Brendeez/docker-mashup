import express from 'express'; // Importing express framework
import dotenv from 'dotenv'; // Importing dotenv for environment variables
import axios from 'axios'; // Importing axios for making HTTP requests

// Load environment variables from .env file
dotenv.config();

// Retrieve API keys and port from environment variables
const news_API_KEY = process.env.NEWS_API_KEY;
const rapid_API_KEY = process.env.RAPID_API_KEY;
const port = process.env.PORT;

// Define API URLs
const news_apiUrl = `https://newsapi.org/v2/top-headlines`; // News API URL
const news_apiUrl_extra = `https://newsapi.org/v2/top-headlines?sources=bbc-news,abc-news,abc-news-au,the-washington-post&apiKey=${news_API_KEY}`; // Additional News API URL

// Create an instance of Express Router
const router = express.Router();

// Define a route for handling requests
router.get('/', async (request, response) => {
    try {
      // Fetch news articles from the News API
      const newsResponse = await axios.get(news_apiUrl_extra);
      const articles = newsResponse.data.articles;
      console.log(articles);

      // Perform sentiment analysis for each article and filter based on a score threshold
      const filteredArticles = await Promise.all(
        articles.map(async (article) => {
          const sentimentOptions = {
            method: 'GET',
            url: 'https://twinword-sentiment-analysis.p.rapidapi.com/analyze/',
            params: {
              text: article.title // Analyze the article title
            },
            headers: {
              'X-RapidAPI-Key': rapid_API_KEY,
              'X-RapidAPI-Host': 'twinword-sentiment-analysis.p.rapidapi.com'
            }
          };

          // Introduce a delay to avoid overloading the sentiment analysis API
          await new Promise(resolve => setTimeout(resolve, 2000));
          try {
            // Fetch sentiment analysis for the article title
            const sentimentResponse = await axios.request(sentimentOptions);
            const sentimentScore = sentimentResponse.data.score;

            // Set your desired sentiment score threshold (e.g., 0.05)
            const scoreThreshold = 0.05;

            if (sentimentScore < scoreThreshold) {
              return article; // Include the article in the filtered list
            } else {
              return null; // Exclude the article from the filtered list
            }
          } catch (sentimentError) {
            console.error('Error fetching sentiment analysis:', sentimentError);
            return null; // Handle sentiment analysis error
          }
        })
      );

      // Filter out null values (articles that didn't meet the threshold)
      const finalArticles = filteredArticles.filter((article) => article !== null);

      console.log('Filtered Articles:');
      console.log(finalArticles);

      // Send the filtered articles as a JSON response
      return response.status(200).json(finalArticles);
    } catch (error) {
      // Handle errors when fetching news or performing sentiment analysis
      console.error('Error fetching news:', error);
      return response.status(404).json({ message: 'No data available' });
    }
  });

// Export the router for use in other parts of the application
export default router;
