import Dashboard from '../views/Dashboard';
import Board from '../views/Board';
import { Nav } from '../components/Nav';

function HomePage() {
    let view = window.localStorage.getItem("view");

    return(
        <>
        <Nav auth={true} />
        {view === 'Dashboard' ? <Dashboard /> : <></>}
        {view === 'Board' ? <Board /> : <></>}
        </>
    )
}

export default HomePage