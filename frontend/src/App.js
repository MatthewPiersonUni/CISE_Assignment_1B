// Route and Routes
import {Route, Routes} from 'react-router-dom';

// Pages
import ModeratorQueue from './components/ModeratorQueue';
import AnalystQueue from './components/AnalystQueue';

function App() {
  return (
    <>
      <div className="appWrapper">
        <Routes>
          <Route path="/moderator" element={< ModeratorQueue />} />
          <Route path="/analyst" element={< AnalystQueue />} />
        </Routes>
      </div>

    </>
  );
}

export default App;