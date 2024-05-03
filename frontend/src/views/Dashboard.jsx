import { useState, useEffect, useRef } from 'react';
import { Alert, Spinner } from "@material-tailwind/react";
import { board_list } from '../services/board';
import BoardForm from '../components/BoardForm';

function Dashboard() {
    const [alert, setAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState("");
    const [boards, setBoards] = useState([]);
    const [boardEdit, setBoardEdit] = useState(false);
    const [boardNew, setBoardNew] = useState(false);
    const [currentBoardEditIndex, setCurrentBoardEditIndex] = useState();
    const newRef = useRef(null);
    const [isFetching, setIsFetching] = useState(false);

    const clear = () => {
        setBoardEdit(false);
        setBoardNew(false);
        setCurrentBoardEditIndex();
        console.log("CLEAR");
    }

    useEffect(() => {
        fetchBoardsData();
    }, []);

    const fetchBoardsData = async () => {
        try{
            setIsFetching(true);
            const response = await board_list();
            setIsFetching(false);
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

    const addBoard = (board, error="") => {
        if (error) {
            setAlert(true); 
            setAlertInfo(error);
        }
        board && setBoards([...boards, board]);
        clear();
    };

    const updateBoard = (board_edited, error="") => {
        if (error) {
            setAlert(true); 
            setAlertInfo(error);
        }
        
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
        <>
        {isFetching ? <div className='flex w-full h-screen justify-center items-center'><Spinner className="h-1/4 w-1/4 text-blue-900/50" /></div> :
        <div className="p-0 md:p-4 lg:p-20">
            <Alert open={alert} onClose={() => setAlert(false)}>
                {alertInfo}
            </Alert>
            <div className="flex flex-wrap justify-center items-start">
                {boards.map((board, index) => (
                <div className="flex flex-col w-80 h-48 border-4 border-blue-400 rounded-lg shadow-md m-4 bg-blue-100 hover:border-8 cursor-pointer" key={index}>
                    
                    {boardEdit && currentBoardEditIndex === index ? 
                        <div className='h-full' ref={newRef}><BoardForm type={"edit"} item={"board"} data={board} update={updateBoard} remove={deleteBoard}/></div>
                        :
                        <div className='h-full p-4'>
                            <h2 className="text-2xl text-center overflow-auto h-4/5 m-0 cursor-pointer break-words" onClick={() => openBoard(board)}>{board.title}</h2>
                            <div className="text-2xl text-center bg-blue-400 hover:bg-blue-600 h-1/5 cursor-pointer" onClick={() => editBoard(index)}>Edit</div>
                        </div>
                    }
                </div>
                ))}
                {boardNew ?
                    <div className="flex flex-col w-80 h-48 rounded-lg shadow-md m-4 bg-blue-100 cursor-pointer">
                        <div className='h-full' ref={newRef}><BoardForm type={"add"} item={"board"} data={""} update={addBoard}/></div>
                    </div> 
                    :
                    <div className="flex justify-center items-center w-80 h-48 border-3 border-gray-400 rounded-lg shadow-md m-4 bg-blue-100 hover:bg-blue-400 cursor-pointer" onClick={() => newBoard()}>
                        <h1 className="text-center text-2xl">+ New board</h1>
                    </div>
                }
            </div>
        </div>
        }
        </>
    )
}

export default Dashboard