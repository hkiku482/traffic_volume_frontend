import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Container, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from "@mui/icons-material";
import { Location } from '../domains/location';
import { useState } from 'react';
import Link from 'next/link';

export const GlobalMenu = (props: { locations: Location[], header: string, children: React.ReactNode }): JSX.Element => {
  const [menu, setMenu] = useState<boolean>(false)
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={(e) => { setMenu(true); setAnchor(e.currentTarget) }}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchor} open={menu} onClose={() => { setMenu(false); setAnchor(null) }}>
            <MenuItem key='all' >
              <Link href='/'>
                <a>全域</a>
              </Link>
            </MenuItem>
            {
              props.locations.map((location) => {
                return (
                  <MenuItem key={location.id} >
                    <Link href={'/' + location.id}>
                      <a>{location.address}</a>
                    </Link>
                  </MenuItem>
                )
              })
            }
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {'Traffic Volume: ' + props.header}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {props.children}
      </Container>
    </Box>
  )
}
