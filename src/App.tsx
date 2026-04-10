import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import DoctorsSection from "./pages/Doctors";
import  Contact  from "./pages/Contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="About" element={<About />} />
      <Route path="Services" element={<Services />} />
      <Route path="Doctors" element={<DoctorsSection />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);

function App() {
  return (
       
   <RouterProvider router={router} />
      
  );
  
}
export default App;

