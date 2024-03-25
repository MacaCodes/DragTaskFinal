import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <App />
  </Provider>
);

// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import axios from 'axios'; // Import Axios for making HTTP requests

// const API_URL = `http://localhost:3001`;

// const Main = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Fetch data from your backend API
//     const fetchData = async () => {
//       try {
//         // Example API call to fetch boards or lists
//         const response = await axios.get(`${API_URL}/boards`); // Adjust URL as per your backend routes
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         // Handle error here (e.g., set error state, display error message)
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Provider store={store}>
//       {/* Display fetched data */}
//       <div>
//         <h1>Hey baby</h1>
//         {/* Display fetched data here */}
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       </div>
//     </Provider>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Main />);
