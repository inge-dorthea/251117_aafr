import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

//* pages
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Advisors from "./pages/about/Advisors";
import Partners from "./pages/about/Partners";
import Approach from "./pages/about/Approach";
import News from "./pages/News";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";

//* admin pages
import LayoutAdmin from "./admin/layout/LayoutAdmin";
import Admin from "./admin/pages/Admin";
import Login from "./admin/pages/Login";
import AdminHome from "./admin/pages/AdminHome";
import AdminAdvisors from "./admin/pages/about/AdminAdvisors";
import AdminPartners from "./admin/pages/about/AdminPartners";
import AdminApproach from "./admin/pages/about/AdminApproach";
import AdminNews from "./admin/pages/AdminNews";
import AdminContact from "./admin/pages/AdminContact";
import ProtectedRoute from "./admin/pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="raadgiverne" element={<Advisors />} />
          <Route path="samarbejdspartnere" element={<Partners />} />
          <Route path="paedagogisk-tilgang" element={<Approach />} />
          <Route path="nyheder" element={<News />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="login" element={<Login />} />
        
        {/* protected route protects these pages */}
          <Route path="/admin" element={<ProtectedRoute><LayoutAdmin /></ProtectedRoute>}>
          <Route index element={<Admin />} />
          <Route path="login" element={<Login />} />
          <Route path="forside" element={<AdminHome />} />
          <Route path="raadgiverne" element={<AdminAdvisors />} />
          <Route path="samarbejdspartnere" element={<AdminPartners />} />
          <Route path="paedagogisk-tilgang" element={<AdminApproach />} />
          <Route path="nyheder" element={<AdminNews />} />
          <Route path="kontakt" element={<AdminContact />} />
        </Route>
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
