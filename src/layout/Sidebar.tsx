
  import { IconButton } from '@mui/material';
  import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
  import MuiDrawer from '@mui/material/Drawer';
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemText from '@mui/material/ListItemText';
  import { CSSObject, Theme, styled } from '@mui/material/styles';
  import React, { useState } from 'react';
  import { HiMiniChevronDoubleLeft, HiOutlineBars3BottomLeft } from "react-icons/hi2";
  import CustomLink from '../controls/CustomLink';
  import Header from './Header';
  import Logo from './Logo';
  import { CALENDAR, DASHBOARD, EMPLOYEE_DIRECTORY, LEARNING, TIME_SHEET } from '../util/string';

  type MenuItem = {
    name: string;
    path: string;
    icon: string;
  };

  type MenuItems = MenuItem[];

  const listItems: MenuItems = [
    {
      name: DASHBOARD,
      path: '/',
      icon: 'HiOutlineSquares2X2'
    },
    {
      name: TIME_SHEET,
      path: '/timesheet/dashboard',
      icon: 'HiOutlineClock'
    },
    {
      name: CALENDAR,
      path: '/calendar/dashboard',
      icon: 'HiOutlineCalendarDays'
    },
    {
      name: EMPLOYEE_DIRECTORY,
      path: '/employees',
      icon: 'HiOutlineUserGroup'
    },
    {
      name: LEARNING,
      path: '/learning/upcoming-seminars',
      icon: 'HiOutlineChartBar'
    },
  ]


  const drawerWidth = 280;

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(11)} + 1px)`,
  });

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(!open && {
      width: `calc(100% - ${theme.spacing(11)} + 1px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));


  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

  const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <AppBar position="fixed" open={open} sx={{ background: '#f1f1f1', boxShadow: 'unset' }}>
          <Header />
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Logo open={open} />
            <IconButton onClick={() => setOpen(!open)} >
              {!open ? <HiOutlineBars3BottomLeft size={'22px'} /> : <HiMiniChevronDoubleLeft size={'22px'} />}
            </IconButton>
          </DrawerHeader>

          <List>
            {listItems.map((item) => (
              <ListItem key={item.name} sx={{ display: open ? 'block' : 'flex', ...(!open && { padding: '4px 20px' }) }}>
                <ListItemButton to={item.path} bgColor="bg-primaryTransparent" open={open} name={item.name} iconName={item.icon} txtColor="text-primary" component={CustomLink}>
                  <ListItemText hidden={!open} primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </>
    );
  };

  export default Sidebar;

