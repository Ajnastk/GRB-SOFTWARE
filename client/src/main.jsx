import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import Rating from "./components/user/Rating.jsx";
import Signup from "./components/admin/Signup.jsx";
import Login from "./components/admin/login.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/rating" element={<Rating />} /> */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>

    <Signup />
  </BrowserRouter>
);

// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider} from "react-router-dom";
// import Rating from './components/user/Rating.jsx'; // Rating component
// import AdminPage from './components/admin/AdminPage.jsx'; // Admin page component

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: < Rating/>,
//     children: [
//       {
//         path: "/admin",
//         element: (
//             <AdminPage />
//         ),
//       },
//     ],
//     errorElement: <div><h1>Something went wrong...</h1></div>, // Error handling
//   },
// ]);

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<RouterProvider router={appRouter} />);
