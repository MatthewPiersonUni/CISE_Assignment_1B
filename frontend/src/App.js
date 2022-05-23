// Route and Routes
import {Route, Routes} from 'react-router-dom';

// Pages
import ModeratorQueue from './components/ModeratorQueue';
import AnalystQueue from './components/AnalystQueue';
import UserSubmit from './components/UserSubmit';
import RejectArticles from './components/RejectedArticles';

function App() {
  return (
    <>
      <div className="appWrapper">
        <Routes>
          <Route path="/moderator" element={< ModeratorQueue />} />
          <Route path="/analyst" element={< AnalystQueue />} />
          <Route path="/userSubmit" element={< UserSubmit />} />
          <Route path="/rejectedArticles" element={< RejectArticles />} />
        </Routes>
      </div>
    </>
  );
}

export default App;