import { useState } from 'react';
import { board_add, board_update, board_delete } from '../services/board';
import { stage_add, stage_update, stage_delete } from '../services/stage';
import { card_add, card_update, card_delete } from '../services/card';
import './BoardForm.css'

function BoardForm({type, item, data, update, remove}) {
    const [title, setTitle] = useState(data.title || "");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (type === "edit") {
            if (item === "stage") {
                EditStage();
            } else if (item === "card") {
                EditCard();
            } else if (item === "board") {
                EditBoard();
            }
        } else if (type === "add") {
            if (item === "stage") {
                AddStage();
            } else if (item === "card") {
                AddCard();
            } else if (item === "board") {
                AddBoard();
            }
        }
    }

    const handleFormDissmis = async (e) => {
        e.preventDefault();
        if (type === "edit") {
            if (item === "stage") {
                DeleteStage();
            } else if (item === "card") {
                DeleteCard();
            } else if (item === "board") {
                DeleteBoard();
            }
        } else {
            update();
        }
    }

    const AddCard = async () => {
        try{
            const response = await card_add(data.board, data.stage, title);
            update(response);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const EditCard = async () => {
        try{
            const response = await card_update(data.board, data.stage, data.card, title);
            update(response);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const DeleteCard = async () => {
        try{
            const response = await card_delete(data.board, data.stage, data.card);
            remove(data.stage, data.card);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const AddStage = async () => {
        try{
            const response = await stage_add(data.board, title);
            update(response);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const EditStage = async () => {
        try{
            const response = await stage_update(data.board, data.stage, title);
            update(response);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const DeleteStage = async () => {
        try{
            const response = await stage_delete(data.board, data.stage);
            remove(data.stage);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const AddBoard = async () => {
        try{
            const response = await board_add(title);
            update(response);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const EditBoard = async () => {
        try{
            const response = await board_update(data.id, title);
            update(response);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const DeleteBoard = async () => {
        try{
            const response = await board_delete(data.id);
            remove(data.id);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form className='board-form'>
            <textarea autoFocus className='board-item-input' required value={title} onChange={e => setTitle(e.target.value)}/>
            <div className='board-form-buttons'>
                <button type='button' onClick={(e) => {title && handleFormSubmit(e)}}>{type === "edit" ? "Save" : "Add"}</button>
                <button type='button' onClick={(e) => handleFormDissmis(e)}>{type === "edit" ? "Delete" : "Close"}</button>
            </div>
        </form>
    )
}

export default BoardForm