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
        scrollToTop()
    };

    function scrollToTop() {
        setTimeout(() => {
          window.scrollTo(document.body.scrollHeight, 0);
        }, 0);
      }

    return(
        <>
        <Header auth={false} update={handleToggleAuthForm}/>
                <section id='head'>
                    <div>
                    <h1>Welcome to CollaboraWave!</h1>
                    </div>
                </section>
                <section id='content-info'>
                    <div>
                    <h3>What is CollaboraWave?</h3>
                    <p>CollaboraWave is an innovative project management application based on the Kanban concept. With it, you can easily create, edit, and delete boards, stages on the board, and cards within stages to efficiently manage your tasks and projects.</p>
                    </div>
                </section>
                <section id='content-list'>
                    <div>
                    <h1>Why CollaboraWave?</h1>
                        <ul>
                            <li>Flexibility</li>
                            <li>Collaboration</li>
                            <li>Intuitive Interface</li>
                        </ul>
                    </div>
                </section>
                <section id='content-info'>
                    <div>
                        <h3>Get started today!</h3> <p>Join thousands of satisfied CollaboraWave users and start managing your projects better.</p>
                    </div>
                    <button onClick={() => handleToggleAuthForm('sign up')}>Sign Up</button>
                </section>
                {displayForm && <Auth type={typeForm} update={handleToggleAuthForm}/>}
                <footer id="footer">
                    <p>&copy; 2024 CollaboraWave. All rights reserved.</p>
                </footer>
        </>
    )
}

export default LandingPage