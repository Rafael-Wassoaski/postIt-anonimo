import "./App.css";
import Home from "./frontend/home/Home";
import NewPostItForm from "./frontend/postits/NewPostItForm";
import Header from "./frontend/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newPostIt" element={<NewPostItForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
