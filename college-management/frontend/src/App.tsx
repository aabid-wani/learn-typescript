import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Faculty from './pages/Faculty';
import Courses from './pages/Courses';
import Fees from './pages/Fees';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/students">Students</Link></li>
          <li><Link to="/faculty">Faculty</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/fees">Fees</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

