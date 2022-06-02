// Route and Routes
import {Route, Routes} from 'react-router-dom';

// Pages
import ModeratorQueue from './components/ModeratorQueue';
import AnalystQueue from './components/AnalystQueue';
import UserSubmit from './components/UserSubmit';
import RejectArticles from './components/RejectedArticles';
import Home from "./components/Home";
import AddNewArticle from "./components/AddNewArticle";
import EditArticle from "./components/EditArticle";
import LandingPage from './components/LandingPage';

function App() {
  return (
    <>
      <div className="appWrapper">
        <Routes>
          <Route exact path="/" element={< LandingPage />}/>
          <Route path="/search" element={< Home />}/>
          <Route path="/add" element={< AddNewArticle />} />
          <Route path="/edit" element={< EditArticle />} />
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