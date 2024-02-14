import { useState } from "react";


function Card (props) {
    const [isCardEditing, setIsCardEditing] = useState(props.editState);
    const [title, setTitle] = useState("");

    return(
        <div className="card" onDoubleClick={() => setIsCardEditing(true)}>
                {isCardEditing 
                ? 
                <>
                <div id="card-text"><input id="card-edit"  type="text" name="card-title" required value={title} onChange={e => setTitle(e.target.value)}/></div>
                <div id="bottom"><button onClick={() => {title !== "" ? setIsCardEditing(false) : setIsCardEditing(true)}}>Dodaj</button><button onClick={() => setIsCardEditing(false)}>Zamknij</button></div>
                </> 
                : 
                <><div id="top">🔼</div>
                <div id="card-text"><p>{title}</p></div>
                <div id="bottom">🔽</div></>}
                
            
        </div>
    )
}

export default Card