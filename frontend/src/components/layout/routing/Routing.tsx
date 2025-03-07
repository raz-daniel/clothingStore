import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import List from "../../stores/list/List";
import Add from "../../stores/add/Add";
import Home from "../../home/Home";


export default function Routing(): JSX.Element {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/books/list" element={<List />} />
            <Route path="/books/add" element={<Add />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}