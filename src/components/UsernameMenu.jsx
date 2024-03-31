import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {React, useState, useRef, useEffect} from "react"
import Button from '@mui/material/Button';
import { CircleUserRound, Space } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { Divider } from '@mui/material';
import {Link} from "react-router-dom";
import { styled } from '@mui/material/styles';

export default function UsernameMenu() {
  const {user,logout} = useAuth0();

  const ColorButton = styled(Button)(() => ({
    color: "#ffffff",
    backgroundColor: "#f57c30",
    '&:hover': {
        backgroundColor: "#f57c00",
        color: "#ffffff"
    },
    }));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span className="flex items-center font-bold gap-2">
                         <CircleUserRound className="text-orange-500" />
                         {user?.email}
        </span> 
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link underline='none' color='#000000' fontWeight='bold' to="/user-profile" className="hover:text-orange-500">
            User Profile
          </Link>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={handleClose}>
        <ColorButton
            onClick={() => logout()}
            className="flex flex-1"
          >
            Log Out
          </ColorButton>
        </MenuItem>
      </Menu>
    </div>
  )
}