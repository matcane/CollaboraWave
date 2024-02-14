import React, { useState } from 'react';
import Card from "./Card.jsx";

function Board () {
    const [stages, setStages] = useState([]);
    const [isStageEditing, setIsStageEditing] = useState(false);
    const [stageName, setStageName] = useState("");

    const addNewCard = (stageIndex) => {
        const newCard = <Card key={stages[stageIndex].cards.length} editState={true}/>;
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
                                    {stage.cards.map((card, cardIndex) => (
                                        <React.Fragment key={cardIndex}>
                                            {card}
                                        </React.Fragment>
                                    ))}
                                    <div className="new-card-button" onClick={() => addNewCard(index)}>+ Nowa kartka</div>
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
                            <div className="new-stage-button" onClick={() => setIsStageEditing(true)}>+ Nowy etap</div>
                        </div>
                        }
                        
                    </li>
                </ol>
            </div>
        </>
    )
}


export default Board