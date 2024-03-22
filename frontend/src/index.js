import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import axios from 'axios'; // Import Axios for making HTTP requests

const API_URL = `http://localhost:3001`;

const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async (boardId) => {
      try {
        // Example API call to fetch boards
        const response = await axios.get(`${API_URL}/boardId/`); // Adjust URL as per your backend routes
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      {/* Display fetched data */}
      <div>
        <h1>Hey baby</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data here */}
      </div>
      <App />
    </Provider>
  );
};

root.render(<Main />);
