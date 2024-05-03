import React from "react"
import { Auth } from "../components/Auth"
import { Footer } from "../components/Footer"
import { Nav } from "../components/Nav"
import { Button, Typography } from "@material-tailwind/react"

function LandingPage() {
    const [isAuthOpen, setIsAuthOpen] = React.useState(false);
    const [authType, setAuthType] = React.useState("");

    const handleAuthTypeChange = (newType) => {
        setAuthType(newType);
    };

    const handleAuthOpenChange = () => {
        setIsAuthOpen(!isAuthOpen);
    };

    return(
        <>
        {isAuthOpen && <Auth type={authType} onAuthTypeChange={handleAuthTypeChange} onAuthOpenChange={handleAuthOpenChange} />}
        {!isAuthOpen && <>
        <Nav auth={false} onAuthTypeChange={handleAuthTypeChange} onAuthOpenChange={handleAuthOpenChange}/>
        

        <section className="flex flex-col px-10 justify-center items-center w-full h-screen snap-center snap-normal">
            <Typography variant="h1" color="blue" textGradient className="text-lg md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl"> Welcome to CollaboraWave! </Typography>
            <Button size="lg" variant="outlined" color="blue" onClick={() => {handleAuthOpenChange(); handleAuthTypeChange("sign up")}}>Try now!</Button>
        </section>

        <section className="flex flex-col px-10 justify-evenly items-center w-full h-screen snap-center snap-normal">
            <Typography variant="h1" color="blue" textGradient className="text-xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl"> What is CollaboraWave? </Typography>
            <Typography variant="lead" color="black" className="h-1/2 text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl">
            CollaboraWave is an innovative project management application based on the Kanban concept. 
            With it, you can easily create, edit, and delete boards, stages on the board, and cards within stages to efficiently manage your tasks and projects.
            </Typography>
        </section>
        
        <section className="flex flex-col px-10 justify-evenly items-center w-full h-screen snap-center snap-normal">
            <Typography variant="h1" color="blue" textGradient className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl"> Why CollaboraWave? </Typography>
            <div className="flex flex-col justify-evenly items-center w-full h-1/3 md:flex-row">
                <Typography variant="h1" className="flex mx-2 items-center justify-center w-full h-full border-4 rounded-2xl border-blue-200 hover:border-blue-400 text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">Flexibility</Typography>
                <Typography variant="h1" className="flex mx-2 items-center justify-center w-full h-full border-4 rounded-2xl border-blue-200 hover:border-blue-400 text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">Collaboration</Typography>
                <Typography variant="h1" className="flex mx-2 items-center justify-center w-full h-full border-4 rounded-2xl border-blue-200 hover:border-blue-400 text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">Intuitive Interface</Typography>
            </div>
        </section>
        
        <Footer />
        </>
        }
        </>
    )
}

export default LandingPage