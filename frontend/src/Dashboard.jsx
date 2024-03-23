import { useState, useEffect, useRef } from 'react';
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
    const newRef = useRef(null);


    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      });

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target)) {
            setIsEditBoard(false);
            setIsNewBoard(false);
        }
      };

    function handleNewBoard() {
        newBoardRequest();
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
        setBoardTitle("");
    }
    
    function handleBoardDelete(boardId) {
        deleteBoardRequest(boardId);
        setIsEditBoard(false);
        setBoards(prevBoards => {
            return prevBoards.filter(board => board.id !== boardId);
        });
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
            console.log(response.data);
            setBoards([...boards, response.data]);
            setBoardTitle("");
            setIsNewBoard(false);
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

    const deleteBoardRequest = async (boardId) => {
        try {
            const response = await client.delete("/api/board_delete/" + boardId, {withCredentials: true});
            window.localStorage.removeItem("boardId");
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
                        <div className='edit-board-container' ref={newRef}>
                        <textarea autoFocus id="card-edit" type="text" name="stage-title" required value={boardTitle} onChange={e => setBoardTitle(e.target.value)}/>
                        <button onClick={() => {boardTitle ? editBoardTitle(boardTitle, board.id) : setIsEditBoard(true)}}>Zapisz</button>
                        <button onClick={() => handleBoardDelete(board.id)}>Usuń</button>
                        </div>
                        : 
                        <>
                            <h2 onDoubleClick={() => handleEditBoard(board, index)}>{board.title}</h2>
                            <div className='board-fill-open' onClick={() => handleOpenBoard(board.id)}></div>
                        </>
                        }
                    </div>
                ))}

            {isNewBoard ? 
            <div className="dashboard-board" id="second" ref={newRef}>
                <textarea autoFocus id="card-edit" type="text" name="stage-title" required value={boardTitle} onChange={e => setBoardTitle(e.target.value)}/>
                <button onClick={() => {boardTitle ? handleNewBoard() : setIsNewBoard(true)}}>Zapisz</button>
                {/* <button onClick={() => setIsNewBoard(false)}>Zamknij</button> */}
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