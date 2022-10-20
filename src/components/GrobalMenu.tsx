import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Container, Grid, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from "@mui/icons-material";
import { Location } from '../domains/location';
import { useState } from 'react';

export const GlobalMenu = (props: { locations: Location[], children: React.ReactNode }): JSX.Element => {
  const [menu, setMenu] = useState<boolean>(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => { setMenu(true) }}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu open={menu} onClose={() => { setMenu(false) }}>
            <MenuItem key="all">全域</MenuItem>
            {
              props.locations.map((location) => {
                return (
                  <MenuItem key={location.id} href={'/' + location.id}>{location.address}</MenuItem>
                )
              })
            }
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Traffic Volume Navigatioin
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {props.children}
      </Container>
    </Box>
  )
}
