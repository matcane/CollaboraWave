import { useState, useEffect } from 'react';
import Board from './Board.jsx';
import axios from 'axios';


let acces = window.localStorage.getItem("access_token");

const client = axios.create({
     baseURL: "http://127.0.0.1:8000",
     headers: {Authorization: `Bearer ${acces}`}
   });


function Dashboard () {
    let OpenBoard = window.localStorage.getItem("boardOpen");

    function handleNewBoard() {
        window.localStorage.setItem("boardOpen", true);
        window.location.reload(false);
    }

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        try {
            const response = await client.get("/api/home/", {withCredentials: true});
            console.log(response);
        } catch (error) {
            const refreshToken = await client.post("/token/refresh/", {refresh: window.localStorage.getItem("refresh_token")});
            window.localStorage.setItem('access_token', refreshToken.data.access);
            window.localStorage.setItem('refresh_token', refreshToken.data.refresh);
            window.location.reload(false);
        }
    }

    return(
        <>
        {OpenBoard ? 
        <Board />
        :
        <div className="dashboard">
        <h1>Panel główny</h1>
        <div className="dashboard-board-list">
            <div className="dashboard-board" id="first">
                <h2>Board Title</h2>
            </div>
            <div className="dashboard-board" id="second">
                <h2>Board Title</h2>
            </div>
            <div className="dashboard-board" onClick={() => handleNewBoard()}>
                <div id="new-board">
                    <h2>+ Nowa tablica</h2>
                </div>
            </div>
        </div>
    </div>
        }
        </>
    )
}

export default Dashboard