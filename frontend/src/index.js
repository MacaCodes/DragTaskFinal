import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const API_URL = `http://localhost:3001`;

const Main = () => {
  const [data, setData] = useState(null);
  const { boardId } = useParams(); 

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`${API_URL}/boards/${boardId}`); 
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [boardId]); 

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
