import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Favicon from 'react-favicon';


//* pages
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
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
import AdminHome from "./admin/pages//home/AdminHome";
import AdminAdvisors from "./admin/pages/about/AdminAdvisors";
import AdminPartners from "./admin/pages/about/AdminPartners";
import AdminApproach from "./admin/pages/about/AdminApproach";
import AdminNews from "./admin/pages/news/AdminNews";
import AdminContact from "./admin/pages/AdminContact";
import ProtectedRoute from "./admin/pages/ProtectedRoute";
import EditAdvisor from "./admin/pages/about/EditAdvisor";
import EditPartner from "./admin/pages/about/EditPartner";
import AdminReviews from "./admin/pages/home/AdminReviews";
import EditReview from "./admin/pages/home/EditReview";
import EditArticle from "./admin/pages/news/EditArticle";

function App() {
  return (
    <BrowserRouter>
    <Favicon url="/public/logo-1d.png" />
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

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Admin />} />
          <Route path="forside" element={<AdminHome />} />
          <Route path="forside/udtalelser" element={<AdminReviews />} />
          <Route path="forside/udtalelser/:reviewId" element={<EditReview />} />
          <Route
            path="forside/udtalelser/ny-udtalelse"
            element={<EditReview />}
          />
          <Route path="raadgiverne" element={<AdminAdvisors />} />
          <Route path="raadgiverne/:advisorId" element={<EditAdvisor />} />
          <Route path="raadgiverne/ny-raadgiver" element={<EditAdvisor />} />
          <Route path="samarbejdspartnere" element={<AdminPartners />} />
          <Route
            path="samarbejdspartnere/:partnerId"
            element={<EditPartner />}
          />
          <Route
            path="samarbejdspartnere/ny-samarbejdspartner"
            element={<EditPartner />}
          />
          <Route path="paedagogisk-tilgang" element={<AdminApproach />} />
          <Route path="nyheder" element={<AdminNews />} />
          <Route path="nyheder/:articleId" element={<EditArticle />} />
          <Route path="nyheder/ny-artikel" element={<EditArticle />} />
          <Route path="kontakt" element={<AdminContact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
