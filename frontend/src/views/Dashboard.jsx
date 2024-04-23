import { useState, useEffect, useRef } from 'react';
import { board_list } from '../services/board';
import './Dashboard.css';
import BoardForm from '../components/BoardForm';

function Dashboard() {
    const [boards, setBoards] = useState([]);
    const [boardEdit, setBoardEdit] = useState(false);
    const [boardNew, setBoardNew] = useState(false);
    const [currentBoardEditIndex, setCurrentBoardEditIndex] = useState();
    const newRef = useRef(null);

    const clear = () => {
        setBoardEdit(false);
        setBoardNew(false);
        setCurrentBoardEditIndex();
    }

    useEffect(() => {
        fetchBoardsData();
    }, []);

    const fetchBoardsData = async () => {
        try{
            const response = await board_list();
            setBoards(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      });

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target)) {
            clear();
        }
      };

    function openBoard(board) {
        window.localStorage.setItem("board_id", board.id);
        window.localStorage.setItem("board_title", board.title);
        window.localStorage.setItem("view", "Board");
        window.location.reload(false);
    }

    function editBoard(index) {
        setBoardEdit(true);
        setBoardNew(false);
        setCurrentBoardEditIndex(index);
    }

    function newBoard() {
        setBoardNew(true);
        setBoardEdit(false);
    }

    const addBoard = (board) => {
        board && setBoards([...boards, board]);
        clear();
    };

    const updateBoard = (board_edited) => {
        setBoards(prevBoards => {
            return prevBoards.map(board => {
                if (board.id === board_edited.id) {
                    return { ...board, title: board_edited.title};
                } else {
                    return board;
                }
            });
        });
        clear();
    };

    const deleteBoard = async (board_deleted) => {
        setBoards(prevBoards => {
            return prevBoards.filter(board => board.id !== board_deleted);
        });
        clear();
    };

    return(
        <div className="dashboard">
            <div className="dashboard-board-list">
                {boards.map((board, index) => (
                    <div className="dashboard-board" key={index}>
                        {boardEdit && currentBoardEditIndex === index? <div ref={newRef}><BoardForm type={"edit"} item={"board"} data={board} update={updateBoard} remove={deleteBoard}/></div> :
                            <>
                            <h2 onClick={() => openBoard(board)}>{board.title}</h2>
                            <div className='dashboard-board-edit' onClick={() => editBoard(index)}>Edit</div>
                            </>
                        }
                    </div>
                ))}
                {boardNew && <div className="dashboard-board-new"><div ref={newRef}><BoardForm type={"add"} item={"board"} data={""} update={addBoard}/></div></div>}
                


                {!boardNew && <div className="dashboard-board-new" onClick={() => newBoard()}><h1>+ New board</h1></div>}
            </div>
        </div>
    )
}

export default Dashboard