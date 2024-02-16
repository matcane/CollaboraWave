import React, { useState, useRef, useEffect } from 'react';
import Card from "./Card.jsx";

function Board () {
    const [stages, setStages] = useState([]);
    const [isCardEditing, setIsCardEditing] = useState(false);
    const [isCardExistingEditing, setIsCardExistingEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [isStageEditing, setIsStageEditing] = useState(false);
    const [stageName, setStageName] = useState("");
    const [stageEditIndex, setStageEditIndex] = useState();
    const [newStage, setNewStage] = useState(false);
    const newRef = useRef(null);

    useEffect(() => {
        console.log(newRef);
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      });
    
    function hideNewCard(index) {
        setIsCardExistingEditing(true);
        setStageEditIndex(index);
        console.log("DONE");
    }

    function unhideNewCard() {
        setIsCardExistingEditing(false);
        console.log("CO JEST");
    }


    const addNewCard = (stageIndex) => {
        setIsCardEditing(false);
        setTitle("");
        const cardinfo = { editState: false, title: title, stageIndex: stageIndex, hideNewCard: hideNewCard, unhideNewCard: unhideNewCard };
        const newCard = <Card key={stages[stageIndex].cards.length} info={cardinfo}/>;
        
        const updatedStages = stages.map((stage, index) => {
            if (index === stageIndex) {
                return {
                    ...stage,
                    cards: [...stage.cards, newCard]
                };
            }
            return stage;
        });
        setStages(updatedStages);
    };

    const addNewStage = () => {
        const newStage = {
            id: stages.length,
            name: stageName,
            cards: []
        };
        setStages([...stages, newStage]);
        setStageName("");
        setIsStageEditing(false);
        //setNewStage(false);
        console.log(stages);
    };

    function handleTempCard(index) {
        setStageEditIndex(index);
        setIsCardEditing(true);
        setIsStageEditing(false);
    }
    
    function handleTempStage() {
        setStageName("");
        setStageEditIndex(null);
        setIsStageEditing(true);
        setIsCardEditing(false);
        setNewStage(true);
    }

    function handleEditStageTitle(index) {
        if (!isStageEditing) {
            setNewStage(false);
            setStageEditIndex(index.id);
            setIsStageEditing(true);
            setIsCardEditing(false);
            setStageName(index.name);
        }
    }

    function changeStageName(stageName, stageId) {
    setIsStageEditing(false);
    setStages(prevStages => {
        return prevStages.map(stage => {
            if (stage.id === stageId) {
                return { ...stage, name: stageName };
            } else {
                return stage;
            }
        });
    });
}


    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target)) {
            setIsCardEditing(false);
            setIsStageEditing(false);
            setIsCardExistingEditing(false);
        }
      };

    return(
        <>
            <div>
                <ol className="board">
                    {stages.map((stage, index) => (
                        <li className="stage" key={stage.id}>
                            <div>
                                {isStageEditing && stageEditIndex == stage.id && !newStage ? 
                                    <div className="stage-title" ref={newRef}>
                                    <textarea autoFocus id="card-edit" type="text" name="stage-title" required value={stageName} onChange={e => setStageName(e.target.value)}/>
                                    <button onClick={() => {stageName !== "" ? changeStageName(stageName, stage.id) : setIsStageEditing(true);}}>Zapisz</button>
                                    <button onClick={() => setIsStageEditing(false)}>Zamknij</button>
                                    </div>
                                    :
                                    <div className="stage-title" onDoubleClick={() => handleEditStageTitle(stage)}>
                                    <p>{stage.name}</p>
                                    </div>
                                }
                                <ol className="stage-list">
                                    {isCardEditing && stageEditIndex == stage.id ?
                                        <>
                                        {stage.cards.map((card, cardIndex) => (
                                            <React.Fragment key={cardIndex}>
                                                {card}
                                            </React.Fragment>
                                        ))}
                                        <div className="card" ref={newRef}>
                                        <div id="card-text"><textarea id="card-edit"  type="text" name="card-title" required value={title} onChange={e => setTitle(e.target.value)}/></div>
                                        <div id="bottom"><button onClick={() =>  {title !== "" ? addNewCard(index) : setIsCardEditing(true)}}>Dodaj</button><button onClick={() => setIsCardEditing(false)}>Zamknij</button></div>
                                        </div>
                                        </>
                                        :
                                        stage.cards.map((card, cardIndex) => (
                                            <React.Fragment key={cardIndex}>
                                                {card}
                                            </React.Fragment>
                                        ))
                                    }
                                    {isCardEditing && stageEditIndex == stage.id || isStageEditing && stageEditIndex == stage.id || isCardExistingEditing && stageEditIndex == stage.id ?
                                    <></>
                                    :
                                    <div className="new-card-button" onClick={() => handleTempCard(stage.id)}>+ Nowa kartka</div>
                                    }
                                </ol>
                            </div>
                        </li>
                    ))}
                    <li className='new-stage'>
                        {isStageEditing && newStage ? 
                        <div className="stage-title" ref={newRef}>
                            <textarea id="card-edit" type="text" name="stage-title" required value={stageName} onChange={e => setStageName(e.target.value)}/><br></br>
                            <button onClick={() => {stageName !== "" ? addNewStage() : setIsStageEditing(true);}}>Zapisz</button>
                            <button onClick={() => setIsStageEditing(false)}>Zamknij</button>
                        </div>
                        :
                        <div>
                            <div className="new-stage-button" onClick={() => handleTempStage()}>+ Nowy etap</div>
                        </div>
                        }
                        
                    </li>
                </ol>
            </div>
        </>
    )
}


export default Board