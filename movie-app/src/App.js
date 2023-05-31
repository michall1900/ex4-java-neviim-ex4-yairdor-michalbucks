import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Menu from "./components/Menu";
import HomePage from "./components/HomePage";
import SearchPage from "./components/search_api/SearchPage";
import CartPage from "./components/cart_page/CartPage";
import CheckOutPage from "./components/checkout_page/CheckOutPage";
import NotFound from "./components/NotFound";
import './style/backgroundStyle.css';
import {HistoryProvider} from "./contexts/HistoryContext";
import {CounterProvider} from "./contexts/CounterContext";

const App = () => {
    return (
        <BrowserRouter>
            <HistoryProvider>
                <CounterProvider>
                    <Routes>
                        <Route path="/" element={<Menu/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="/search" element={<SearchPage/>}/>
                            <Route path="/cart" element={<CartPage/>}/>
                            <Route path="/checkout" element={<CheckOutPage/>}/>
                            <Route path={"*"} element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </CounterProvider>
            </HistoryProvider>
        </BrowserRouter>
    );
};

export default App;
