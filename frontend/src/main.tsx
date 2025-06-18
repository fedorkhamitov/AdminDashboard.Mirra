import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './app/Router'
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// const originalFetch = window.fetch;
// window.fetch = async (...args) => {
//   const response = await originalFetch(...args);
//   if (response.status === 401 && window.location.pathname !== "/login") {
//     window.location.href = "/login";
//   }
//   return response;
// };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>,
)
