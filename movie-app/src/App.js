import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Menu from "./components/Menu";
import HomePage from "./components/HomePage";
import SearchPage from "./components/searchApi/SearchPage";
import CartPage from "./components/CartPage";
import CheckOutPage from "./components/CheckOutPage";
import NotFound from "./components/NotFound";
import './style/backgroundStyle.css';
import {HistoryProvider} from "./contexts/HistoryContext";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <HistoryProvider>
                    <Routes>
                        <Route path="/" element={<Menu/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="/search" element={<SearchPage/>}/>
                            <Route path="/cart" element={<CartPage/>}/>
                            <Route path="/checkout" element={<CheckOutPage/>}/>
                            <Route path={"*"} element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </HistoryProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
