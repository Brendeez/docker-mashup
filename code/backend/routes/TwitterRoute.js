import express from 'express'; // Importing the Express framework
import dotenv from 'dotenv'; // Importing dotenv for environment variables
import axios from 'axios'; // Importing axios for making HTTP requests

// Load environment variables from .env file
dotenv.config();

// Retrieve API keys and port from environment variables

const rapid_API_KEY = process.env.RAPID_API_KEY;

// Create an instance of Express Router
const router = express.Router();

// Define a route for handling requests with a topic parameter
router.get('/:topic', async (request, response) => {
    try {
        const topic = request.params.topic; // Extract the topic from the URL parameter

        // Get the current date
        const currentDate = new Date();

        // Get the date from a week ago
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Format the dates as "YYYY-MM-DD"
        const oneWeekAgoFormatted = formatDate(oneWeekAgo);

        // Function to format a date as "YYYY-MM-DD"
        function formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        // Define options for making a Twitter API request
        const options = {
            method: 'GET',
            url: 'https://twitter154.p.rapidapi.com/search/search',
            params: {
                query: topic,
                section: 'top',
                limit: '5',
                start_date: oneWeekAgoFormatted,
                language: 'en'
            },
            headers: {
                'X-RapidAPI-Key': rapid_API_KEY,
                'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
            }
        };

        // Make a Twitter API request
        const twitter_response = await axios.request(options);
        console.log(twitter_response.data);

        // Send the Twitter data as a JSON response
        return response.status(201).json(twitter_response.data);
    } catch (error) {
        // Handle errors when fetching Twitter data
        console.error(error);
        return response.status(404).json({ message: 'No data available' });
    }
});


// Export the router for use in other parts of the application
export default router;
