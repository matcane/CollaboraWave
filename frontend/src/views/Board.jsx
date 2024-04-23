import { useState, useEffect, useRef } from 'react';
import { board_stages } from '../services/board';
import BoardForm from '../components/BoardForm';
import './Board.css';


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

    return(
            <div>
                <ol className="board">
                    {stages.map((stage, index) => (
                        <li className="stage" key={index}>
                            <div>
                                <div className="stage-title" onDoubleClick={() => handleEditStage(index)}>
                                    {stageEdit && currentStageEditIndex === index ? <div ref={newRef}><BoardForm type={"edit"} item={"stage"} data={{board: board_id, stage: stage.id, title: stage.title}} update={updateStage} remove={deleteStage}/></div> :
                                    <p>{stage.title}</p>
                                    }
                                </div>
                                <ol>
                                    {stage.cards.map((card, cardIndex) => (
                                        <div className="card" key={cardIndex} onDoubleClick={() => handleEditCard(index, cardIndex)}>
                                            {cardEdit && currentCardEditIndex === cardIndex && currentStageEditIndex === index ? <div ref={newRef}><BoardForm type={"edit"} item={"card"} data={{board: board_id, stage: stage.id, card: card.id, title: card.title}} update={updateCard} remove={deleteCard}/></div> :
                                            <p>{card.title}</p>
                                            }
                                        </div>
                                    ))}

                                    {cardNew && currentStageEditIndex === index && <div className='card' ref={newRef}><BoardForm type={"add"} item={"card"} data={{board: board_id, stage: stage.id, title: ""}} update={addCard}/></div>}
                                </ol>
                                <ol>
                                {((!cardEdit || !stageEdit) && currentStageEditIndex !== index) &&
                                    <div className="new-card-button" onClick={() => handleNewCard(index)}>+ Nowa kartka</div>
                                }
                                </ol>
                            </div>
                        </li>
                    ))}
                    <li className='new-stage'>
                            <div>
                            {stageNew && 
                                <div className="stage-title">
                                    <div ref={newRef}><BoardForm type={"add"} item={"stage"} data={{board: board_id}} update={addStage}/></div>
                                </div>
                                }
                            {!stageNew && <div className="new-stage-button" onClick={() => handleNewStage()}>+ Nowy etap</div>}
                        </div>
                    </li>
                </ol>
            </div>
    )
}

export default Board