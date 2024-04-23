import { useState } from 'react';
import Auth from '../components/Auth';
import Header from '../components/Header';
import './LandingPage.css';

function LandingPage() {
    const [displayForm, setDisplayFrom] = useState(false);
    const [typeForm, setTypeForm] = useState("");

    const handleToggleAuthForm = (type) => {
        setTypeForm(type);
        setDisplayFrom(!displayForm);
    };

    return(
        <>
        <Header auth={false} update={handleToggleAuthForm}/>
        {displayForm && <Auth type={typeForm} update={handleToggleAuthForm}/>}
        </>
    )
}

export default LandingPage