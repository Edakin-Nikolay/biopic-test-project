import React, {Dispatch, SetStateAction, useState} from 'react';
import './App.css';
import GettingData from "./components/GettingData";
import {LinearProgress} from "@material-ui/core";
import * as api from './api';

function App() {
    const [globalLoading, setGlobalLoading] = useState(0);

    function incGlobal () {
        setGlobalLoading(prevState => prevState + 1);
    }

    function decGlobal () {
        setGlobalLoading(prevState => prevState - 1);
    }

    function getPage (url: string,
                      setLoading: Dispatch<SetStateAction<boolean>>,
                      setSuccess: Dispatch<SetStateAction<boolean>>,
                      setFailed: Dispatch<SetStateAction<boolean>>) {
        incGlobal();
        api.getPageTimeOut(url, setLoading, setSuccess, setFailed, decGlobal);
    }

    return (
        <div className="App">
            <header className="App-header">
                Тестовое задание Biopic Medical
            </header>
            {(globalLoading > 0) && <LinearProgress color="primary" />}
            <div className="Data-grid">
                {[...Array(5).keys()].map((key: number) =>
                    <GettingData key={key} getPage={getPage} label={`Получение данных по URL №${key+1}:`}/>)}
            </div>
        </div>
    );
}

export default App;
