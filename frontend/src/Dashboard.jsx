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
    const [isNewBoard, setIsNewBoard] = useState(false);
    const [isEditBoard, setIsEditBoard] = useState(false);
    const [boardIndex, setBoardIndex] = useState();
    const [boardTitle, setBoardTitle] = useState("");
    const [boards, setBoards] = useState([]);

    function handleNewBoard() {
        newBoardRequest();
        const newBoard = {
            title: boardTitle,
        };
        setBoards([...boards, newBoard]);
        setBoardTitle("");
        setIsNewBoard(false);
    }

    function handleEditBoard(board, index) {
        setIsEditBoard(true);
        setBoardIndex(index);
        setBoardTitle(board.title);
    }

    function handleOpenBoard(id) {
        window.localStorage.setItem("boardOpen", true);
        window.localStorage.setItem("boardId", id);
        window.location.reload(false);
    }

    function editBoardTitle(title, boardId) {
        updateBoardRequest(title, boardId);
        setBoardTitle("");
        setIsEditBoard(false);
        setBoards(prevBoards => {
            return prevBoards.map(board => {
                if (board.id === boardId) {
                    return { ...board, title: title };
                } else {
                    return board;
                }
            });
        });
    }

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        try {
            const response = await client.get("/api/board_list/", {withCredentials: true});
            setBoards(response.data);
        } catch (error) {
            const refreshToken = await client.post("/token/refresh/", {refresh: window.localStorage.getItem("refresh_token")});
            window.localStorage.setItem('access_token', refreshToken.data.access);
            window.localStorage.setItem('refresh_token', refreshToken.data.refresh);
            window.location.reload(false);
        }
    }

    const newBoardRequest = async () => {
        try {
            const response = await client.post("/api/board_create/", {title: boardTitle}, {withCredentials: true});
        } catch (error) {
            console.log(error);
        }
    }

    const updateBoardRequest = async (title, boardId) => {
        try {
            const response = await client.put("/api/board_update/" + boardId + "/", {title: title}, {withCredentials: true});
        } catch (error) {
            console.log(error);
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
                {boards.map((board, index) => (
                    <div className="dashboard-board" id="first" key={index}>
                        {isEditBoard && boardIndex == index ? 
                        <>
                        <textarea autoFocus id="card-edit" type="text" name="stage-title" required value={boardTitle} onChange={e => setBoardTitle(e.target.value)}/>
                        <button onClick={() => {boardTitle ? editBoardTitle(boardTitle, board.id) : setIsEditBoard(true)}}>Zapisz</button>
                        <button onClick={() => setIsEditBoard(false)}>Zamknij</button>
                        </>
                        : 
                        <>
                        <h2 onDoubleClick={() => handleEditBoard(board, index)}>{board.title}</h2>
                        <dir className="board-fill-open" onClick={() => handleOpenBoard(board.id)}></dir>
                        </>
                        }
                    </div>
                ))}

            {isNewBoard ? 
            <div className="dashboard-board" id="second">
                <textarea autoFocus id="card-edit" type="text" name="stage-title" required value={boardTitle} onChange={e => setBoardTitle(e.target.value)}/>
                <button onClick={() => {boardTitle ? handleNewBoard() : setIsNewBoard(true)}}>Zapisz</button>
                <button onClick={() => setIsNewBoard(false)}>Zamknij</button>
            </div>
            :
            <div className="dashboard-board" onClick={() => setIsNewBoard(true)}>
                <div id="new-board">
                    <h2>+ Nowa tablica</h2>
                </div>
            </div>
            }
            
        </div>
    </div>
        }
        </>
    )
}

export default Dashboard