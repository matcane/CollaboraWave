import React, { useState, useRef, useEffect } from 'react';
import Card from "./Card.jsx";
import axios from 'axios';

let acces = window.localStorage.getItem("access_token");

const client = axios.create({
     baseURL: "http://127.0.0.1:8000",
     headers: {Authorization: `Bearer ${acces}`}
   });

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
    
    useEffect(() => {
        fetchDataStage();
        
      }, []);

    const fetchDataStage = async () => {
        const boardId = window.localStorage.getItem("boardId");
        try {
            const response = await client.get("/api/board/" + boardId + "/stages/", {withCredentials: true});
            setStages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const newStageRequest = async () => {
        const boardId = window.localStorage.getItem("boardId");
        try {
            const response = await client.post("/api/board/" + boardId + "/stage_create/", {title: stageName}, {withCredentials: true});
        } catch (error) {
            console.log(error);
        }
    }

    const updateStageRequest = async (stageName, stageId) => {
        const boardId = window.localStorage.getItem("boardId");
        try {
            const response = await client.put("/api/board/" + boardId + "/stage_update/" + stageId + "/", {title: stageName}, {withCredentials: true});
        } catch (error) {
            console.log(error);
        }
    }

    const newCardRequest = async (stageIndex) => {
        const boardId = window.localStorage.getItem("boardId");
        try {
            const response = await client.post("/api/board/" + boardId + "/stage_detail/" + stageIndex + "/card_create/", {title: title, stage: stageIndex}, {withCredentials: true});
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateCardRequest = async (title, stageId, cardId) => {
        const boardId = window.localStorage.getItem("boardId");
        try {
            const response = await client.put("/api/board/" + boardId + "/stage_detail/" + stageId + "/card_update/" + cardId + "/", {title: title}, {withCredentials: true});
        } catch (error) {
            console.log(error);
        }
    }
    
    function hideNewCard(index) {
        setIsCardExistingEditing(true);
        setStageEditIndex(index);
    }

    function unhideNewCard(title, stageId, cardId, isClicked) {
        setIsCardExistingEditing(false);
        if (isClicked==true) {
            updateCardRequest(title, stageId, cardId);
            console.log("TRUE");
        }
        else {
            console.log("FALSE");
            console.log(isClicked);
        }
    }


    const addNewCard  = async (stageIndex, stageId) => {
        const tempCard = await newCardRequest(stageId);
        setIsCardEditing(false);
        setTitle("");

        const cardinfo = {id: tempCard.id, title: title, stage: stageId};
    
        const updatedStages = stages.map((stage, index) => {
        if (index === stageIndex) {
            return {
                ...stage,
                cards: [...stage.cards, cardinfo]
            };
        }
        return stage;
        });
        setStages(updatedStages);
        console.log(tempCard);
    };

    const addNewStage = () => {
        const lastStage = stages[stages.length - 1];
        newStageRequest();
        const newStage = {
            id: lastStage ? lastStage.id + 1 : 0,
            title: stageName,
            cards: []
        };
        setStages([...stages, newStage]);
        setStageName("");
        setIsStageEditing(false);
        setNewStageData();
        setStageEditIndex();
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
            setStageName(index.title);
        }
    }

    function changeStageName(stageName, stageId) {
        updateStageRequest(stageName, stageId);
        setIsStageEditing(false);
        setStages(prevStages => {
            return prevStages.map(stage => {
                if (stage.id === stageId) {
                    return { ...stage, title: stageName };
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
                        <li className="stage" key={index}>
                            <div>
                                {isStageEditing && stageEditIndex == stage.id && !newStage ? 
                                    <div className="stage-title" ref={newRef}>
                                    <textarea autoFocus id="card-edit" type="text" name="stage-title" required value={stageName} onChange={e => setStageName(e.target.value)}/>
                                    <button onClick={() => {stageName ? changeStageName(stageName, stage.id) : setIsStageEditing(true);}}>Zapisz</button>
                                    <button onClick={() => setIsStageEditing(false)}>Zamknij</button>
                                    </div>
                                    :
                                    <div className="stage-title" onDoubleClick={() => handleEditStageTitle(stage)}>
                                    <p>{stage.title}</p>
                                    </div>
                                }
                                <ol className="stage-list">
                                    {isCardEditing && stageEditIndex == stage.id ?
                                        <>
                                        {stage.cards.map((card, cardIndex) => (
                                            <Card key={cardIndex} stageIndex={stage.id} editState={false} info={card} hideNewCard={hideNewCard} unhideNewCard={unhideNewCard}/>
                                        ))}
                                        <div className="card" ref={newRef}>
                                        <div id="card-text"><textarea id="card-edit"  type="text" name="card-title" required value={title} onChange={e => setTitle(e.target.value)}/></div>
                                        <div id="bottom"><button onClick={() =>  {title ? addNewCard(index, stage.id) : setIsCardEditing(true)}}>Dodaj</button><button onClick={() => setIsCardEditing(false)}>Zamknij</button></div>
                                        </div>
                                        </>
                                        :
                                        stage.cards.map((card, cardIndex) => (
                                            <Card key={cardIndex} stageIndex={stage.id} editState={false} info={card} hideNewCard={hideNewCard} unhideNewCard={unhideNewCard}/>
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