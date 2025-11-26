import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import Explorer from './pages/Explorer';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/explorer" element={<Explorer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
