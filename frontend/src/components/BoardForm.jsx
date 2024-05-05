import { useState, useRef } from 'react';
import { board_add, board_update, board_delete } from '../services/board';
import { stage_add, stage_update, stage_delete } from '../services/stage';
import { card_add, card_update, card_delete } from '../services/card';
import { Spinner } from "@material-tailwind/react";

function BoardForm({type, item, data, update, remove, loading}) {
    const [title, setTitle] = useState(data.title || "");
    const newRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            const response = await card_add(data.board, data.stage, title);
            setIsLoading(false);
            update(response);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const EditCard = async () => {
        try{
            if (title.length > 40) {
                throw new Error("Ensure this field has no more than 40 characters.");
            } else if (title.length === 0) {
                throw new Error("This field may not be blank.");
            } 
            else {
                setIsLoading(true);
                const response = await card_update(data.board, data.stage, data.card, title);
                setIsLoading(false);
                update(response);
                setTitle("");
            }
        } catch (error) {
            update("", error=error.message);
        }
    }

    const DeleteCard = async () => {
        try{
            setIsLoading(true);
            const response = await card_delete(data.board, data.stage, data.card);
            setIsLoading(false);
            remove(data.stage, data.card);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const AddStage = async () => {
        try{
            setIsLoading(true);
            const response = await stage_add(data.board, title);
            setIsLoading(false);
            update(response);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const EditStage = async () => {
        try{
            if (title.length > 40) {
                throw new Error("Ensure this field has no more than 40 characters.");
            } else if (title.length === 0) {
                throw new Error("This field may not be blank.");
            } 
            else {
                setIsLoading(true);
                const response = await stage_update(data.board, data.stage, title);
                setIsLoading(false);
                update(response);
                setTitle("");
            }
        } catch (error) {
            update("", error=error.message);
        }
    }

    const DeleteStage = async () => {
        try{
            setIsLoading(true);
            const response = await stage_delete(data.board, data.stage);
            setIsLoading(false);
            remove(data.stage);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }

    const AddBoard = async () => {
        try{
            if (title.length > 40) {
                throw new Error("Ensure this field has no more than 40 characters.");
            } else if (title.length === 0) {
                throw new Error("This field may not be blank.");
            } 
            else {
                setIsLoading(true);
                const response = await board_add(title);
                setIsLoading(false);
                update(response);
                setTitle("");
            }
        } catch (error) {
            update("", error=error.message);
        }
    }

    const EditBoard = async () => {
        try{
            if (title.length > 40) {
                throw new Error("Ensure this field has no more than 40 characters.");
            } else if (title.length === 0) {
                throw new Error("This field may not be blank.");
            } 
            else {
                setIsLoading(true);
                const response = await board_update(data.id, title);
                setIsLoading(false);
                update(response);
                setTitle("");
            }
        } catch (error) {
            update("", error=error.message);
        }
    }

    const DeleteBoard = async () => {
        try{
            setIsLoading(true);
            const response = await board_delete(data.id);
            setIsLoading(false);
            remove(response.data.id);
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        {isLoading ? <div className='flex h-full justify-center items-center'><Spinner className="h-1/2 w-1/2 text-blue-900/50" /></div>
        :
        <form className='flex flex-col items-center space-y-2' id='form'>
            <textarea maxLength={40} spellCheck={false} ref={newRef} autoFocus className='bg-transparent w-full min-h-14 text-2xl px-4 py-4 rounded-lg outline-none resize-none' required value={title} onChange={e => setTitle(e.target.value)}/>
            <div className='flex justify-center space-x-4'>
                <button type='button' onClick={(e) => handleFormSubmit(e)} className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>{type === "edit" ? "Save" : "Add"}</button>
                <button type='button' onClick={(e) => handleFormDissmis(e)} className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>{type === "edit" ? "Delete" : "Close"}</button>
            </div>
        </form>
        }
        </>
    )
}

export default BoardForm