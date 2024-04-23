import Header from '../components/Header';
import Dashboard from '../views/Dashboard';
import Board from '../views/Board';
import './HomePage.css';

function HomePage() {
    let view = window.localStorage.getItem("view");

    return(
        <>
        <Header auth={true} update={() => {window.localStorage.clear(); window.location.reload(false);}}/>
        {view === 'Dashboard' ? <Dashboard /> : <></>}
        {view === 'Board' ? <Board /> : <></>}
        </>
    )
}

export default HomePage