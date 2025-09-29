import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Destination from './pages/Destination';
import Listing from './pages/Listing';
import Bookinghistory from './pages/Bookinghistory';
import Feedback from './pages/Feedback';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/bookinghistory" element={<Bookinghistory />} />
          <Route path="/feedback" element={<Feedback />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;