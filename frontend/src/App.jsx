import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Properties from "./pages/Properties.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.tsx";
import Sellers from "./pages/Sellers.jsx";

export default function App() {
  return (
      <>
          <BrowserRouter>
              <Header/>
                <main className="h-auto bg-transparent">
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/signup" element={<Signup/>}/>
                      <Route path="/properties" element={<Properties/>}/>
                      <Route path="/services" element={<Services/>}/>
                      <Route path="/seller" element={<Sellers/>}/>
                      <Route path="/contact" element={<Contact/>}/>
                  </Routes>
                </main>
              <Footer/>
          </BrowserRouter>
      </>
  )
}
