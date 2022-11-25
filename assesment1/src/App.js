import Alldata from "./Logdata/Alldata";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Alldata />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
