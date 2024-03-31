import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { MenuIcon } from "lucide-react";
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import {React, useState} from "react"
import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import MobileNavLinks from './MobileNavLinks';

export default function MobileNav() {
    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
    };  

    const ColorButton = styled(Button)(({ theme }) => ({
        color: "ffffff",
        backgroundColor: "#f57c00",
        '&:hover': {
          backgroundColor: "#e64a19",
        },
    })); 

    const {loginWithRedirect, isAuthenticated, user} = useAuth0();

  return (
    <div>
        <MenuIcon className="text-orange-500" onClick={toggleDrawer("right",true)}/>
        <Drawer
            anchor="right"
            open={state.right}
            onClose={toggleDrawer("right",false)}
        >
            <div className="space-y-3 px-8 py-8">
                {isAuthenticated ? 
                    <span className="flex items-center font-bold gap-2">
                         <CircleUserRound className="text-orange-500" />
                         {user?.email}
                    </span> 
                : 
                    <span className='flex items-center font-bold gap-2 text-orange-500'>
                        Welcome to QuickSlice
                    </span>
                } 
                <Divider/>
                <div className="flex flex-col gap-4">
                {isAuthenticated ? (
                        <MobileNavLinks/>
                    ) : 
                    <ColorButton variant="contained" onClick={() => loginWithRedirect()}>Log In</ColorButton>
                }
                </div>
            </div>
        </Drawer>
    </div>
  )
}