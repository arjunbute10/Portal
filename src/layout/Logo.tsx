import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
type LogoProps = {
  open: boolean
}
export default function Logo({ open }: LogoProps) {
  return (
    <Box className="flex justify-center">
      <NavLink to="/" className={open ? 'p-5' : ''}>
        <img src={open ? "/assets/images/logo.png" : "/assets/images/favicon.png"} alt="Sundeus Technology" />
      </NavLink>
    </Box>
  );
};