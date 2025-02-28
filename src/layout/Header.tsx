
import { Badge, Container, Divider, Fade, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { HiOutlineBellAlert, HiOutlineClock } from "react-icons/hi2";
import ColorAvatar from '../controls/ColorAvatar';
import { useAuth } from '../util/auth/AuthProvider';
import { UserInfo } from '../pages/auth/login/Login.model';
import { useNavigate } from 'react-router-dom';
import { LOGOUT, PROFILE, SETTINGS } from '../util/string';
import { useUser } from '../util/auth/UserInfoProvider';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { userInfo } = useUser();
  const [userData, setUserData] = useState<UserInfo | null>(null);

  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const handleNotificationClick = (event: any) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleAccountClick = (event: any) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (link: string = '') => {
    setNotificationAnchorEl(null);
    setAccountAnchorEl(null);
    if(link)
      navigate(link);
  };

  useEffect(() => {
    setUserData(userInfo);
  }, [userInfo]);

  return (
    <Toolbar disableGutters className="items-center justify-between mx-[50px] border-b-[1px] border-[#ccc]">
      <Box>

      </Box>
      <Box>
        {/* <IconButton
          onClick={handleNotificationClick}
          aria-controls={notificationAnchorEl ? 'notification-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(notificationAnchorEl)}
        >
          <Badge className='mr-2' badgeContent={4} color="primary">
            <HiOutlineBellAlert color={'#212B36'} size={26} />
          </Badge>
        </IconButton> */}
        {/* <Menu
          className='notification-menu'
          anchorEl={notificationAnchorEl}
          id="notification-menu"
          open={Boolean(notificationAnchorEl)}
          onClose={() => (handleMenuClose())}
          onClick={() => (handleMenuClose())}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              borderRadius: '12px',
              mt: 0.7,
              ml: -1,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          TransitionComponent={Fade}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Typography variant='subtitle1' sx={{ mx: '25px', pt: 1 }}>Notifications</Typography>
          <Typography variant='body2' sx={{ mx: '25px', pb: 2 }}>You have 2 unread notifications.</Typography>
          <Divider />

          <Container maxWidth='xs' >
            <MenuItem onClick={() => (handleMenuClose())}>
              <Grid container sx={{ py: 0.5 }}>
                <Grid container item>
                  <Typography variant='h6' sx={{ m: 0 }}>Time Sheet Remainder&nbsp;</Typography>
                  <Typography variant='body2'>Please fill the pending timesheet</Typography>
                </Grid>
                <Grid container item>
                  <Typography variant='body2' sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}><HiOutlineClock className="mr-2" size={18} /> 01 Mar 2023</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <MenuItem onClick={() => (handleMenuClose())}>
              <Grid container sx={{ py: 0.5 }}>
                <Grid container item>
                  <Typography variant='h6' sx={{ m: 0 }}>Time Sheet Remainder&nbsp;</Typography>
                  <Typography variant='body2'>Please fill the pending timesheet</Typography>
                </Grid>
                <Grid container item>
                  <Typography variant='body2' sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}><HiOutlineClock className="mr-2" size={18} /> 01 Mar 2023</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <MenuItem onClick={() => (handleMenuClose())}>
              <Grid container sx={{ py: 0.5 }}>
                <Grid container item>
                  <Typography variant='h6' sx={{ m: 0 }}>Time Sheet Remainder&nbsp;</Typography>
                  <Typography variant='body2'>Please fill the pending timesheet</Typography>
                </Grid>
                <Grid container item>
                  <Typography variant='body2' sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}><HiOutlineClock className="mr-2" size={18} /> 01 Mar 2023</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <MenuItem onClick={() => (handleMenuClose())}>
              <Grid container sx={{ py: 0.5 }}>
                <Grid container item>
                  <Typography variant='h6' sx={{ m: 0 }}>Time Sheet Remainder&nbsp;</Typography>
                  <Typography variant='body2'>Please fill the pending timesheet</Typography>
                </Grid>
                <Grid container item>
                  <Typography variant='body2' sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}><HiOutlineClock className="mr-2" size={18} /> 01 Mar 2023</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          </Container>
          <Divider />
          <MenuItem onClick={() => (handleMenuClose())} className='p-0 m-0'>
            <Grid container>
              <Grid container item className='flex items-center font-semibold justify-center text-primary'>
                View All
              </Grid>
            </Grid>
          </MenuItem>
        </Menu> */}

        <IconButton
          onClick={handleAccountClick}
          aria-controls={accountAnchorEl ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(accountAnchorEl)}
        >
          <ColorAvatar {...(userData?.profileImageUrl
            ? {
              imageUrl: userData?.profileImageUrl
            }
            : {
              name: userData?.employeeName,
            }
          )} size={40} />
        </IconButton>
        <Menu
          className='account-menu'
          anchorEl={accountAnchorEl}
          id="account-menu"
          open={Boolean(accountAnchorEl)}
          onClose={() => (handleMenuClose())}
          onClick={() => (handleMenuClose())}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              borderRadius: '12px',
              mt: 0.7,
              ml: -1,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          TransitionComponent={Fade}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Typography variant='subtitle1' sx={{ pt: 1 }}>{userData?.employeeName}</Typography>
          <Typography variant='body2' sx={{ pb: 2 }}>{userData?.userName}</Typography>
          <Divider />
          <MenuItem onClick={() => handleMenuClose('/employee-profile')}>{PROFILE}</MenuItem>
          <MenuItem onClick={() => handleMenuClose()}>{SETTINGS}</MenuItem>
          <Divider />
          <MenuItem onClick={() => { handleMenuClose(); logout(); }}>{LOGOUT}</MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
}
