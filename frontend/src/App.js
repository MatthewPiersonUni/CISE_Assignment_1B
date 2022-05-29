// Route and Routes
import {Route, Routes} from 'react-router-dom';

// Pages
import Home from "./components/Home";
import AddNewArticle from "./components/AddNewArticle";
import EditArticle from "./components/EditArticle";

function App() {
  return (
    <>
      <div className="appWrapper">
        <Routes>
          <Route exact path="/" element={< Home />}/>
          <Route path="/add" element={< AddNewArticle />} />
          <Route path="/edit" element={< EditArticle />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
