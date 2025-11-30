
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Directory } from './pages/Directory';
import { Jobs } from './pages/Jobs';
import { JobDetails } from './pages/JobDetails';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Loyalty } from './pages/Loyalty';
import { EditProfile } from './pages/EditProfile';
import { ProDashboard } from './pages/ProDashboard';
import { RiderDashboard } from './pages/RiderDashboard';
import { StableDetails } from './pages/StableDetails';
import { Contact } from './pages/Contact';
import { Auth } from './pages/Auth';
import { FAQ } from './pages/FAQ';
import { CGV } from './pages/CGV';
import { MentionsLegales } from './pages/MentionsLegales';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { About } from './pages/About';
import { EquiBot } from './components/EquiBot';
import { JobProvider } from './context/JobContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
        <JobProvider>
            <Router>
            <ScrollToTop />
            <Layout>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/stable/:id" element={<StableDetails />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/loyalty" element={<Loyalty />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/cgv" element={<CGV />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
                <Route path="/about" element={<About />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/pro-dashboard" element={<ProDashboard />} />
                <Route path="/rider-dashboard" element={<RiderDashboard />} />
                </Routes>
                <EquiBot />
            </Layout>
            </Router>
        </JobProvider>
    </UserProvider>
  );
}

export default App;
