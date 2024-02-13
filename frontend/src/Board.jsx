import React, { useState } from 'react';
import Card from "./Card.jsx";

function Board () {

    const [cards, setCards] = useState([<Card key={0} />]);

    const addNewCard = () => {
    
    const newCard = <Card key={cards.length} />;
    setCards([...cards, newCard]);
    };
    

    return(
        <>
        <div>
            <ol className="board">
                <li className="stage">
                    <div>
                        <div className="stage-title">
                            <p>asdhjkdashjgkhgjksdahgsasasdassadsdasdas</p>
                        </div>
                            <ol className="stage-list">
                                <li>
                                    {cards.map((card, index) => (
                                        <React.Fragment key={index}>
                                        {card}
                                        </React.Fragment>
                                    ))}
                                    <div className="new-card-button" onClick={() => addNewCard()}>+ Nowa kartka</div>
                                </li>
                            </ol>
                    </div>
                </li>
                <li className="stage">
                    <div>
                        <div className="stage-title">
                            <p>Stage 2</p>
                        </div>
                            <ol className="stage-list">
                            <li>
                                    {cards.map((card, index) => (
                                        <React.Fragment key={index}>
                                        {card}
                                        </React.Fragment>
                                    ))}
                                    <div className="new-card-button" onClick={() => addNewCard()}>+ Nowa kartka</div>
                                </li>
                            </ol>
                    </div>
                </li>
                <li className="stage">
                    <div>
                        <div className="stage-title">
                            <p>Stage 2</p>
                        </div>
                            <ol className="stage-list">
                            <li>
                                    {cards.map((card, index) => (
                                        <React.Fragment key={index}>
                                        {card}
                                        </React.Fragment>
                                    ))}
                                    <div className="new-card-button" onClick={() => addNewCard()}>+ Nowa kartka</div>
                                </li>
                            </ol>
                    </div>
                </li>
                <li className="stage">
                    <div>
                        <div className="stage-title">
                            <p>ahahahahahahahhahahahha</p>
                        </div>
                            <ol className="stage-list">
                                <li>
                                    {cards.map((card, index) => (
                                        <React.Fragment key={index}>
                                        {card}
                                        </React.Fragment>
                                    ))}
                                    <div className="new-card-button" onClick={() => addNewCard()}>+ Nowa kartka</div>
                                </li>
                            </ol>
                    </div>
                </li>    
                
            </ol>
        </div>
        
        </>
    )
}

export default Board