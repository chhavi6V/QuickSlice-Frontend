import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material"
import { styled } from '@mui/material/styles';
import UsernameMenu from "./UsernameMenu";
import React from 'react';

export default function MainNav() {
    const ColorButton = styled(Button)(() => ({
        color: "#000000",
        '&:hover': {
            backgroundColor: "#f57c00",
            color: "#ffffff"
        },
    }));

    const {loginWithRedirect, isAuthenticated} = useAuth0();
  return (
    <span>
      {isAuthenticated ? (<UsernameMenu />) : 
        <ColorButton 
          className="font-bold"
          onClick={async()=>await loginWithRedirect()}
        >
          Log In
        </ColorButton>
      }
    </span>
  )
}