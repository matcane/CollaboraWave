import React from "react";
import {Navbar, Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react";
import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/solid";
import { Auth } from "./Auth";


function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const logout = () => {window.localStorage.clear(); window.location.reload(false)}
 
    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
            <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
            <Avatar variant="circular" size="sm" alt="tania andrew" className="p-0.5" src="/blank.png" />
            <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${ isMenuOpen ? "rotate-180" : "" }`} />
            </Button>
        </MenuHandler>
        <MenuList className="p-1">
                <MenuItem onClick={logout} className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}>
                    <PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2}/>
                <Typography as="span" variant="small" className="font-normal" color={"red"}>Sign out</Typography>
                </MenuItem>
        </MenuList>
        </Menu>
    );
}


export function Nav({auth, onAuthTypeChange, onAuthOpenChange}) {
    const handleHomeButton = async () => {
        if (window.localStorage.getItem("view")) {window.localStorage.setItem("view", "Dashboard");}
        window.localStorage.removeItem("board_title");
        window.location.reload(false);
    }
    return (
        <Navbar variant="gradient" className={`bg-blue-400 mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 ${ !auth ? "snap-center snap-normal" : ""}`}>
        <div className="relative mx-auto flex items-center justify-between">
            <Typography as="a" color="black" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium select-none" onClick={() => handleHomeButton()}>CollaboraWave</Typography>

            {auth ? <ProfileMenu /> : <Button size="sm" variant="text" color="black" onClick={() => {onAuthOpenChange(); onAuthTypeChange("sign in")}}><span>Log In</span></Button>}
            
        </div>
        </Navbar>
    );
}