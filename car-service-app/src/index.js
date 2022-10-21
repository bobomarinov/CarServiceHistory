import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CarInfo from "./pages/CarInfo";
import CarAdd from "./pages/CarAdd";
import EventAdd from "./pages/EventAdd";

import reportWebVitals from './reportWebVitals';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarInfo />} />
        <Route path="/add-car" element={<CarAdd />} />C
        <Route path="/add-event" element={<EventAdd />} />y
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
