import { useState, useRef, useEffect } from "react";



function Card (props) {
    const [isCardEditing, setIsCardEditing] = useState(props.editState);
    const [title, setTitle] = useState(props.info.title);
    const newRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      });

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target)) {
            setIsCardEditing(false);
            props.unhideNewCard();
        }
      };

    function handleDoubleClick() {
        console.log(props.stageIndex);
        setIsCardEditing(true);
        props.hideNewCard(props.stageIndex);
    }

    return(
        <div className="card" onDoubleClick={() => handleDoubleClick()}>
                {isCardEditing 
                ? 
                <>
                <div id="card-text" ref={newRef}><textarea autoFocus id="card-edit"  type="text" name="card-title" required value={title} onChange={e => setTitle(e.target.value)}/></div>
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