import { useState, useRef, useEffect } from "react";



function Card (props) {
    const [isCardEditing, setIsCardEditing] = useState(props.editState);
    const [title, setTitle] = useState(props.title);
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
        }
      };

    return(
        <div className="card" ref={newRef} onDoubleClick={() => setIsCardEditing(true)}>
                {isCardEditing 
                ? 
                <>
                <div id="card-text"><input id="card-edit"  type="text" name="card-title" required value={title} onChange={e => setTitle(e.target.value)}/></div>
                <div id="bottom"><button onClick={() => {title !== "" ? setIsCardEditing(false) : setIsCardEditing(true)}}>Dodaj</button><button onClick={() => setIsCardEditing(false)}>Zamknij</button></div>
                </> 
                : 
                <><div id="top" onClick={() => console.log(props.key)}>🔼</div>
                <div id="card-text"><p>{title}</p></div>
                <div id="bottom">🔽</div></>}
                
            
        </div>
    )
}

export default Card