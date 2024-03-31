import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useAuth0 } from "@auth0/auth0-react";

const ColorButton = styled(Button)(() => ({
    color: "#ffffff",
    backgroundColor: "#f57c30",
    '&:hover': {
        backgroundColor: "#f57c00",
        color: "#ffffff"
    },
}));

export default function MobileNavLinks() {
    const {logout} = useAuth0();
  return (
    <div className="space-y-3 px-4 py-4">
        <Link to='/user-profile' className="flex bg-white items-center font-bold hover:text-orange-500">
            User Profile
        </Link>
        <Divider className="my-5"/>
        <ColorButton
            onClick={() => logout()}
            className="flex flex-1 "
          >
            Log Out
        </ColorButton>
    </div>
  )
}