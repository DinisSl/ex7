import { BrowserRouter, Routes, Route} from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import Edit from "./pages/Edit.jsx";
import Details from "./pages/Details.jsx";
import Vote from "./pages/Vote.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage/>}/>
                <Route path="/edit" element={<Edit/>}/>
                <Route path="/details" element={<Details/>}/>
                <Route path="/vote" element={<Vote/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;