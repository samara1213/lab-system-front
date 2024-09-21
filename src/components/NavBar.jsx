import { AppBar, Avatar, Divider, Drawer, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { MenuOptions } from './MenuOptions'
import MenuIcon from '@mui/icons-material/Menu';
import { CorporateFare, Logout, Settings } from '@mui/icons-material';

export const NavBar = () => {

    const [openMenu, setOpenMenu] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        size='large'
                        edge='start'
                        onClick={() => setOpenMenu(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Menu
                    </Typography>
                    <IconButton
                        color='inherit'
                        size='large'
                        edge='end'
                        onClick={handleClick}

                    >
                        <Avatar sx={{ bgcolor: '#673ab7'}}>FD</Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}                                            
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {                                                                    
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
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
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar><CorporateFare/></Avatar> Nombre empresa
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Avatar/> fd13122019@gmail.com
                        </MenuItem>
                        <Divider />                 
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                open={openMenu}
                anchor='left'
                onClose={() => setOpenMenu(false)}
            >
                <MenuOptions setOpenMenu={setOpenMenu} />
            </Drawer>
        </>
    )
}
