import React, { useState, useRef, useEffect } from 'react';
import Card from "./Card.jsx";

function Board () {
    const [stages, setStages] = useState([]);
    const [isCardEditing, setIsCardEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [isStageEditing, setIsStageEditing] = useState(false);
    const [stageName, setStageName] = useState("");
    const [stageEditIndex, setStageEditIndex] = useState(0);
    const newRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      });

    const addNewCard = (stageIndex) => {
        setIsCardEditing(false);
        setTitle("");
        const newCard = <Card key={stages[stageIndex].cards.length} editState={false} title={title}/>;
        
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
        console.log(stages);
    };

    function handleTempCard(index) {
        setStageEditIndex(index);
        setIsCardEditing(true);
        setIsStageEditing(false);
    }

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target)) {
            setIsCardEditing(false);
        }
      };

    return(
        <>
            <div>
                <ol className="board">
                    {stages.map((stage, index) => (
                        <li className="stage" key={stage.id}>
                            <div>
                                <div className="stage-title">
                                    <p>{stage.name}</p>
                                </div>
                                <ol className="stage-list">
                                    {isCardEditing && stageEditIndex == stage.id ?
                                        <>
                                        {stage.cards.map((card, cardIndex) => (
                                            <React.Fragment key={cardIndex}>
                                                {card}
                                            </React.Fragment>
                                        ))}
                                        <div className="card" ref={newRef}>
                                        <div id="card-text"><input id="card-edit"  type="text" name="card-title" required value={title} onChange={e => setTitle(e.target.value)}/></div>
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
                                    {isCardEditing && stageEditIndex == stage.id ?
                                    <></>
                                    :
                                    <div className="new-card-button" onClick={() => handleTempCard(stage.id)}>+ Nowa kartka</div>
                                    }
                                </ol>
                            </div>
                        </li>
                    ))}
                    <li className='new-stage'>
                        {isStageEditing ? 
                        <div>
                            <input type="text" id="stage-name" name="stage-name" required value={stageName} onChange={e => setStageName(e.target.value)} /><br></br>
                            <button onClick={() => {stageName !== "" ? addNewStage() : setIsStageEditing(true);}}>Zapisz</button>
                            <button onClick={() => setIsStageEditing(false)}>Zamknij</button>
                        </div>
                        :
                        <div>
                            <div className="new-stage-button" onClick={() => {setIsStageEditing(true); setIsCardEditing(false)}}>+ Nowy etap</div>
                        </div>
                        }
                        
                    </li>
                </ol>
            </div>
        </>
    )
}


export default Board