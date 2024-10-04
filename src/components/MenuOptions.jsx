import { Box, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Divider, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import { NavLink } from 'react-router-dom';

const arrayMenu = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />

  },
  {
    title: 'Usuarios',
    path: '/usuarios',
    icon: <GroupIcon />

  }
  ,
  {
    title: 'Companias',
    path: '/companies',
    icon: <GroupIcon />

  }
]

export const MenuOptions = ({ setOpenMenu }) => {

  return (
    <>
      <Box sx={{ width: 250 }}>
        <nav>
          <List>
            {
              arrayMenu.map((itemMenuOption) => (
                <ListItem
                  disablePadding
                  key={itemMenuOption.title}
                >
                  <ListItemButton
                    component={NavLink}
                    to={itemMenuOption.path}
                    onClick={() => setOpenMenu(false)}
                  >
                    <ListItemIcon>{itemMenuOption.icon}</ListItemIcon>
                    <ListItemText>{itemMenuOption.title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
          <Divider />
        </nav>
      </Box>
    </>
  )
}
