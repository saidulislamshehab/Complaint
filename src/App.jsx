import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubmitComplaint from "./SubmitComplaint.jsx";
import ViewComplaint from "./ViewComplaint.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubmitComplaint />} />
        <Route path="/complaints" element={<ViewComplaint />} />
      </Routes>
    </Router>
  );
}

export default App;
