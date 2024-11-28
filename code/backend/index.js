import express, { json } from 'express';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import cors from 'cors';
import axios from 'axios';
import TwitterRoute from './routes/TwitterRoute.js';
import PositiveRoute from './routes/PositiveRoute.js';
import NegativeRoute from './routes/NegativeRoute.js';
import KEwikiRoute from './routes/KEwikiRoute.js';

dotenv.config();

const app = express();

const news_API_KEY = process.env.NEWS_API_KEY;
const rapid_API_KEY = process.env.RAPID_API_KEY;
const port = process.env.PORT;

const news_apiUrl = `https://newsapi.org/v2/top-headlines`;
const news_apiUrl_extra = `https://newsapi.org/v2/top-headlines?sources=bbc-news,abc-news,abc-news-au,the-washington-post&apiKey=${news_API_KEY}`;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

app.use('/twitter2', TwitterRoute);
app.use('/positive', PositiveRoute);
app.use('/negative', NegativeRoute);
app.use('/KWEW', KEwikiRoute);

const s3 = new AWS.S3();

// Specify the S3 bucket and object key
const bucketName = "bdam1-n11072059-s3-cab432-a1";
const objectKey = "text.json";

// JSON data to be written to S3
const jsonDataExample = {
  name: "cab432",
  number: 0
};

// Function to create an S3 bucket if it doesn't exist
async function createS3bucket() {
  try {
    await s3.createBucket({ Bucket: bucketName }).promise();
    console.log(`Created bucket: ${bucketName}`);
    return true;
  } catch (err) {
    if (err.statusCode === 409) {
      console.log(`Bucket already exists: ${bucketName}`);
      return false;
    } else {
      console.log(`Error creating bucket: ${err}`);
      return false;
    }
  }
}

// Function to upload JSON data to S3
async function uploadJsonToS3(jsonData) {
  jsonData.number = jsonData.number + 1;
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: JSON.stringify(jsonData), // Convert JSON to string
    ContentType: "application/json", // Set content type
  };

  try {
    await s3.putObject(params).promise();
    console.log("JSON file uploaded successfully.");
  } catch (err) {
    console.error("Error uploading JSON file:", err);
  }
}

// Function to retrieve an object from S3
async function getObjectFromS3() {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    const data = await s3.getObject(params).promise();
    // Parse JSON content
    const parsedData = JSON.parse(data.Body.toString("utf-8"));
    console.log("Parsed JSON data:", parsedData);
    return parsedData;
  } catch (err) {
    console.error("Error:", err);
  }
}

// Define a route for handling requests
app.get('/', async (request, response) => {
  // Retrieve data from S3
  const resultFromS3 = await getObjectFromS3();

  // Check if data exists in S3
  if (resultFromS3 === undefined) {
    // If data doesn't exist, create a new S3 bucket and upload JSON data
    await createS3bucket();
    await uploadJsonToS3(jsonDataExample);
    return response.status(200).json(jsonDataExample);
  }

  // Update and upload data to S3
  await uploadJsonToS3(resultFromS3);

  return response.status(200).json(resultFromS3);
});

// Start the Express server
app.listen(port, () => {
  console.log(`App is listening to port: ${port}`);
});
