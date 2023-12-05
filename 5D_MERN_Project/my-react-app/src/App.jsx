import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Layout from './components/layout';
import Dashboard from './components/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
          path="/*"
          element={
      
        <Layout>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>}
        />
        </Routes>
      </Router>
    </>
  );
}

export default App;

