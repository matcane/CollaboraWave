import { useState, useEffect, useRef } from 'react';
import { board_stages } from '../services/board';
import BoardForm from '../components/BoardForm';


function Board() {

    let board_id = window.localStorage.getItem("board_id");
    const [stages, setStages] = useState([]);
    const [currentCardEditIndex, setCurrentCardEditIndex] = useState();
    const [currentStageEditIndex, setCurrentStageEditIndex] = useState();
    const [cardNew, setCardNew] = useState(false);
    const [cardEdit, setCardEdit] = useState(false);
    const [stageNew, setStageNew] = useState(false);
    const [stageEdit, setStageEdit] = useState(false);
    const newRef = useRef(null);

    const clear = () => {
        setCardEdit(false);
        setStageEdit(false);
        setCardNew(false);
        setStageNew(false);
        setCurrentStageEditIndex();
        setCurrentCardEditIndex();
    }

    useEffect(() => {
        fetchStagesData();
    }, []);

    const fetchStagesData = async () => {
        try{
            const response = await board_stages(board_id);
            setStages(response);
            console.log(response);
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


    const handleEditCard = async (index, cardIndex) => {
        setCardEdit(true);
        setStageEdit(false);
        setCardNew(false);
        setStageNew(false);
        setCurrentStageEditIndex(index);
        setCurrentCardEditIndex(cardIndex);
    }

    const handleNewCard = async (index) => {
        setCardNew(true);
        setStageEdit(false);
        setCardEdit(false);
        setStageNew(false);
        setCurrentStageEditIndex(index);  
    }

    const handleEditStage = async (index) => {
        setStageEdit(true);
        setCardEdit(false);
        setCardNew(false);
        setStageNew(false);
        setCurrentStageEditIndex(index);
    }

    const handleNewStage = async () => {
        setStageNew(true);
        setStageEdit(false);
        setCardEdit(false);
        setCardNew(false);
        setCurrentStageEditIndex();
    }

    const addCard = (card) => {
        card && setStages(prevStages => {
            return prevStages.map(stage => {
                if (stage.id === card.stage) {
                    return { ...stage, cards: [...stage.cards, card]};
                } else {
                    return stage;
                }
            })
        })
        clear();
    };

    const updateCard = (card_edited) => {
        setStages(prevStages => {
            return prevStages.map(stage => {
                if (stage.id === card_edited.stage) {
                    return {
                        ...stage,
                        cards: stage.cards.map(card => {
                            if (card.id === card_edited.id) {
                                return card_edited;
                            } else {
                                return card;
                            }
                        })
                    };
                } else {
                    return stage;
                }
            });
        });
        clear();
    };

    const deleteCard = (stage_from, card_deleted) => {
        const updatedStages = stages.map((stage) => {
            return stage.id === stage_from ? { ...stage, cards: stage.cards.filter((card) => card.id !== card_deleted) } : stage;
        });
        setStages(updatedStages);
        clear();
    };


    const addStage = (stage) => {
        stage && setStages([...stages, stage]);
        clear();
    };

    const updateStage = (stage_edited) => {
        setStages(prevStages => {
            return prevStages.map(stage => {
                if (stage.id === stage_edited.id) {
                    return { ...stage, title: stage_edited.title};
                } else {
                    return stage;
                }
            });
        });
        clear();
    };

    const deleteStage = (stage_deleted) => {
        setStages(prevStages => {
            return prevStages.filter(stage => stage.id !== stage_deleted);
        });
        clear();
    };

    useEffect(() => {
        if (newRef.current) {
            newRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, [cardNew]);

    return(
            <>
                <ol className="flex flex-row w-full h-[calc(100vh-3.5rem)] overflow-x-auto scrollbar-hidden select-none">
                                {stages.map((stage, index) => (
                                    <li className="flex flex-col items-center h-[calc(100%-6rem)] w-96 m-10" key={index}>
                                        <>
                                                {stageEdit && currentStageEditIndex === index ? 
                                                <div className='w-full text-center bg-blue-200 border-2 border-blue-400 rounded-lg p-3 cursor-pointer' ref={newRef}><BoardForm type={"edit"} item={"stage"} data={{board: board_id, stage: stage.id, title: stage.title}} update={updateStage} remove={deleteStage}/></div> 
                                                :
                                                <div className="w-96 h-16 min-h-16 text-center bg-blue-200 border-2 border-blue-400 rounded-lg overflow-x-auto cursor-pointer hover:bg-blue-400 hover:border-blue-200" onDoubleClick={() => handleEditStage(index)}>
                                                <p>{stage.title}</p>
                                                </div>
                                                }
                                            <ol className='p-0 w-96 overflow-y-auto overflow-x-hidden list-none'>
                                                {stage.cards.map((card, cardIndex) => (
                                                    <div className="bg-blue-200 w-auto min-h-32 border-2 border-blue-400 rounded-lg m-10 p-2 relative cursor-pointer hover:bg-blue-400 hover:border-blue-200" key={cardIndex} onDoubleClick={() => handleEditCard(index, cardIndex)}>
                                                        {cardEdit && currentCardEditIndex === cardIndex && currentStageEditIndex === index ? <div ref={newRef}><BoardForm type={"edit"} item={"card"} data={{board: board_id, stage: stage.id, card: card.id, title: card.title}} update={updateCard} remove={deleteCard}/></div> :
                                                        <p className='break-words'>{card.title}</p>
                                                        }
                                                    </div>
                                                ))}

                                                {cardNew && currentStageEditIndex === index && <div className='bg-blue-200 w-auto min-h-32 border-2 border-blue-400 rounded-lg m-10 p-2 relative cursor-pointer hover:bg-blue-400 hover:border-blue-200' ref={newRef}><BoardForm type={"add"} item={"card"} data={{board: board_id, stage: stage.id, title: ""}} update={addCard}/></div>}
                                            </ol>
                                            <ol>
                                            {((!cardEdit || !stageEdit) && currentStageEditIndex !== index) &&
                                                <div className="bg-blue-200 w-96 h-12 border-2 border-blue-400 rounded-lg m-2 p-3.5 relative cursor-pointer hover:bg-blue-400 hover:border-blue-200" onClick={() => handleNewCard(index)}>+ New card</div>
                                            }
                                            </ol>
                                        </>
                                    </li>
                                ))}
                                <li className='flex flex-col items-center h-[calc(100%-6rem)] w-96 m-10'>
                                        <ol className='flex justify-center p-0 w-96 overflow-y-auto overflow-x-hidden list-none'>
                                        {stageNew && 
                                            <div className="w-full text-center bg-blue-200 border-2 border-blue-400 rounded-lg p-3 cursor-pointer">
                                                <div ref={newRef}><BoardForm type={"add"} item={"stage"} data={{board: board_id}} update={addStage}/></div>
                                            </div>
                                            }
                                        {!stageNew && <div className="bg-blue-200 w-96 h-16 border-2 border-blue-400 rounded-lg m-2 p-3.5 cursor-pointer" onClick={() => handleNewStage()}>+ New stage</div>}
                                    </ol>
                                </li>
                            </ol>
            </>
    )
}

export default Board