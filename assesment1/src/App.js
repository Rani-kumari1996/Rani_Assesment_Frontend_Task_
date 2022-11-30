import LogTable from "./Component/Logdata/LogTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LogTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
