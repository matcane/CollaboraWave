import React from "react";
import { sign_in, sign_up } from '../services/auth';
import { Card, Input, Button, Typography, IconButton } from "@material-tailwind/react";

   
  export function Auth({type, onAuthTypeChange, onAuthOpenChange}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const clear = () => {
        setUsername("");
        setPassword("");
        window.location.reload(false);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (type === "sign up") {
            const response = await sign_up(username, password);
            type = "sign in";
        }
        if (type === "sign in") {
            const response = await sign_in(username, password);
            window.localStorage.clear();
            window.localStorage.setItem('access_token', response.access);
            window.localStorage.setItem('refresh_token', response.refresh);
            window.localStorage.setItem("isLogged", true);
            window.localStorage.setItem("view", "Dashboard");
            clear();
        }
      };
    return (
        <div className="absolute top-0 bottom-0 flex justify-center items-center w-full h-screen bg-gray-500">
       <Card color="white" shadow={false} className="p-20">
        <Typography variant="h4" color="blue-gray" className="flex items-center justify-between">
        {type === "sign up" && "Sign Up"}
        {type === "sign in" && "Sign In"}
        <IconButton onClick={() => onAuthOpenChange()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </IconButton>
        </Typography>
        <Typography color="gray" className="mt-4 font-normal">
        {type === "sign up" && <>Nice to meet you! Enter your details to register.</>}
        {type === "sign in" && <>Nice to meet you! Enter your details to login.</>}
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">Your Name</Typography>
            <Input
              size="lg"
              placeholder="username"
              autoComplete="off"
              required value={username} 
              onChange={e => setUsername(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              autoComplete="off"
              required value={password} 
              onChange={e => setPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6" color="blue" fullWidth onClick={e => handleOnSubmit(e)}>
            {type === "sign up" && type}
            {type === "sign in" && type}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal select-none">
            {type === "sign up" && <>Already have an account?{" "}<a onClick={() => onAuthTypeChange("sign in")} className="font-medium text-blue-900 cursor-pointer">Sign In</a></>}
            {type === "sign in" && <>Don't have an account?{" "}<a onClick={() => onAuthTypeChange("sign up")} className="font-medium text-blue-900 cursor-pointer">Sign Up</a></>}
          </Typography>
        </form>
      </Card>
      </div>
    );
  }