
import { AppBar, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Logo from './Logo';

export default function AuthHeader() {

  return (
    <AppBar position="fixed" sx={{ background: '#fff', boxShadow: 'unset' }}>
      <Toolbar className="items-center justify-between">
        <Box>
          <Logo open={true}/>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
