import styled from 'styled-components'
import { withTheme } from '@emotion/react'
import { Grid, Link, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material'

const AppBar = styled(MuiAppBar)`
  background: #444243 !important;
  color: #fff !important;
`
function Copyright() {
    return (
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.facebook.com/NFtheater">
          NF Theater
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
    
  }

function footer() {
    
  return (
    <AppBar position="static" elevation={0}>
        <Toolbar>
            <Copyright />
        </Toolbar>
    </AppBar>
    )
}

export default withTheme(footer)
