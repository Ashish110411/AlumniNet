
import './App.css'
import HelloWorld from "./HelloWorld.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import ListAlumniComponent from "./components/ListAlumniComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AlumniComponent from "./components/AlumniComponent.jsx";
import ContactAlumniComponent from "./components/ContactAlumniComponent.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <HeaderComponent/>
            <Routes>
                {/*// http://localhost:3000*/}
                <Route path="/" element={<ListAlumniComponent/>}></Route>
                {/*// http://localhost:3000/alumni*/}
                <Route path="/alumni" element={<ListAlumniComponent/>}></Route>
                {/*// http://localhost:3000/add-alumni*/}
                <Route path="/add-alumni" element={<AlumniComponent/>}></Route>
                {/*// http://localhost:3000/contact-alumni*/}
                <Route path="/contact-alumni/:id" element={<ContactAlumniComponent/>}></Route>
                {/*// http://localhost:3000/edit-alumni*/}
                <Route path="/edit-alumni/:id" element={<AlumniComponent/>}></Route>
            </Routes>
            {/*<ListAlumniComponent/>*/}
            <FooterComponent/>
        </BrowserRouter>

    </>
    )
}

export default App
