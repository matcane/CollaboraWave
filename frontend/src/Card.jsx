import { useState, useRef, useEffect } from "react";



function Card (props) {
    const [isCardEditing, setIsCardEditing] = useState(props.editState);
    const [title, setTitle] = useState(props.info.title);
    const [savedtitle, setSavedTitle] = useState(props.info.title);
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
            if (savedtitle != title) {
              setTitle(savedtitle);
            }
        }
      };

    function handleDoubleClick() {
        console.log(props.stageIndex);
        setIsCardEditing(true);
        props.hideNewCard(props.stageIndex);
    }

    function handleTitleEdit() {
      console.log("AGH");
      setIsCardEditing(false);
      props.unhideNewCard();
    };

    return(
        <>
                {isCardEditing 
                ? 
                <div className="card" ref={newRef}>
                <div id="card-text"><textarea autoFocus id="card-edit" type="text" name="card-title" required value={title} onChange={e => setTitle(e.target.value)}/></div>
                <div id="bottom"><button onClick={() => {title ? handleTitleEdit() : setIsCardEditing(true)}}>Dodaj</button><button onClick={() => setIsCardEditing(false)}>Zamknij</button></div>
                </div> 
                : 
                <div className="card" onDoubleClick={() => handleDoubleClick()}>
                <div id="top">🔼</div>
                <div id="card-text"><p>{title}</p></div>
                <div id="bottom">🔽</div>
                </div>
                }
                
            
        </>
    )
}

export default Card