import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );

//       <App />
//     </Provider>
//   );
// };

//       {/* Display fetched data */}
//       <div>
//         <h1>Hey baby</h1>
//         <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data here */}
//       </div>
//       <App />
//     </Provider>
//   );
// };

// root.render(<Main />);