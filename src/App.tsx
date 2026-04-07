import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home"
import  Layout from "./components/Layout";
import Doctors from "./pages/Doctors";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path="About" element={<About/>} />
      <Route path="Doctors" element={<Doctors/>} />
    </Route>
  )
);


function App() {
  return (
       
   <RouterProvider router={router} />
      
  );
  
}
export default App;

