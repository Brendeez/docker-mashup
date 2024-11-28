import express, { json } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

// Retrieve API keys and port from environment variables
const news_API_KEY = process.env.NEWS_API_KEY;
const rapid_API_KEY = process.env.RAPID_API_KEY;
const port = process.env.PORT;

// Define API URLs
const news_apiUrl = `https://newsapi.org/v2/top-headlines`;
const news_apiUrl_extra = `https://newsapi.org/v2/top-headlines?sources=bbc-news,abc-news,abc-news-au,the-washington-post&apiKey=${news_API_KEY}`;

// Create an instance of Express Router
const router = express.Router();

// Helper function to replace spaces with underscores in a string
function replaceSpacesWithUnderscores(inputString) {
  return inputString.replace(/\s+/g, '_');
}

// Define a route for handling requests
router.get('/*', async (request, response) => {
  try {
    const URL = request.params[0];

    // Prepare data for making a POST request
    const encodedParams = new URLSearchParams();
    encodedParams.set('url', URL);
    encodedParams.set('wordnum', '20');

    // Configure options for the POST request
    const options = {
      method: 'POST',
      url: 'https://textanalysis-keyword-extraction-v1.p.rapidapi.com/keyword-extractor-url',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': rapid_API_KEY,
        'X-RapidAPI-Host': 'textanalysis-keyword-extraction-v1.p.rapidapi.com'
      },
      data: encodedParams,
    };

    // Make a POST request to extract keywords
    const KeywordExtraction = await axios.request(options);
    const KWE_data = KeywordExtraction.data.keywords;

    // Fetch data from Wikipedia for each keyword
    const filtered_wiki = await Promise.all(
      KWE_data.map(async (keyword) => {
        const wikiapi = `https://en.wikipedia.org/api/rest_v1/page/summary/${replaceSpacesWithUnderscores(keyword)}`;

        // Introduce a delay to avoid overloading Wikipedia's servers
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
          // Make a request to Wikipedia API
          const wiki_val = await axios.get(wikiapi);

          // Check if the keyword exists in Wikipedia
          if (wiki_val.data.title !== "Not found") {
            return wiki_val;
          } else {
            return null;
          }
        } catch (WikiError) {
          // Handle errors when fetching data from Wikipedia
          return null;
        }
      })
    );

    // Filter out null values and extract data from Wikipedia
    const finalwiki = filtered_wiki.filter((wiki) => wiki !== null);
    const finalwikidata = finalwiki.map((wiki) => wiki.data);

    // Prepare the response data
    const wikidata_and_ke = {
      keywords: KWE_data,
      results: finalwikidata
    };

    // Send the response with the extracted data
    return response.status(200).json(finalwikidata);
  } catch (error) {
    // Handle errors in the request
    console.error('Error fetching data:', error);
    return response.status(404).json({ message: 'No data available' });
  }
});


export default router;
