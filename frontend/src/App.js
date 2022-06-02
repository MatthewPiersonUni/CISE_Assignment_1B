// Route and Routes
import {Route, Routes} from 'react-router-dom';

// Pages
import ModeratorQueue from './components/ModeratorQueue';
import AnalystQueue from './components/AnalystQueue';
import UserSubmit from './components/UserSubmit';
import RejectArticles from './components/RejectedArticles';
import Search from "./components/Search";
import AddNewArticle from "./components/AddNewArticle";
import EditArticle from "./components/EditArticle";
import Home from './components/Home';

function App() {
  return (
    <>
      <div className="appWrapper">
        <Routes>
          <Route exact path="/" element={< Home />}/>
          <Route path="/search" element={< Search />}/>
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