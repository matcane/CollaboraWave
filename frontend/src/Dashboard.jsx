import { useState } from 'react';
import Board from './Board.jsx';


function Dashboard () {
    let OpenBoard = window.localStorage.getItem("boardOpen");

    function handleNewBoard() {
        window.localStorage.setItem("boardOpen", true);
        window.location.reload(false);
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