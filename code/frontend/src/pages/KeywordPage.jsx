import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BB from '../components/BackButton';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import KeywordList from '../components/KeywordList';
import { fetchConfig } from "../fetchConfig";

const KeywordPage = () => {
  // State variables to manage articles, articles2, and loading state
  const [articles, setArticles] = useState([]);
  const [articles2, setArticles2] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Use the useLocation hook to get data passed from the previous page
  const location = useLocation();
  console.log("location: ", location);
  const receivedData = location.state.itemdata.url;
  console.log(receivedData);

  useEffect(() => {
    const fetchData = async () => {
      const backendURL = await fetchConfig();
      console.log(backendURL);

      // Set loading to true to indicate that data is being fetched
      setLoading(true);

      // Make a GET request to the backend API to fetch articles
      axios
        .get(`${backendURL}/KWEW/${receivedData}`) // change to "positive" in the final version
        .then((response) => {
          // Set the articles state with the response data
          setArticles(response.data);
          console.log(response.data);

          // Set loading back to false when data is received
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);

          // Set loading back to false in case of an error
          setLoading(false);
        });

      // Uncomment this section if you want to fetch articles2 as well
      // axios
      //   .get(`${backendURL}/KWEW2/${location.state.itemdata.title}`) // change to "positive" in the final version
      //   .then((response) => {
      //     setArticles2(response.data);
      //     console.log(response.data);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     setLoading(false);
      //   });
    };

    // Call the fetchData function to initiate the API request
    fetchData();
  }, []);

  // Concatenate the articles and articles2 arrays
  const concatenatedArray = articles2.concat(articles);

  return (
    <div>
      <Header />
      <div className="bg-blue-100 h-8 flex items-center justify-center">
        <h1 className="bg-green-400 font-bold py-2 px-4 rounded ">{location.state.itemdata.title}</h1>
      </div>
      {loading ? <Spinner /> : ''}
      <div className='mt-4'>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {concatenatedArray.length === 0 ? (
            <p>No data available.</p>
          ) : (
            concatenatedArray.map((data, index) => (
              <KeywordList key={index} data={data} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default KeywordPage;
