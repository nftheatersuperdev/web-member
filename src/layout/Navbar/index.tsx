/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable no-restricted-imports */
import styled from 'styled-components'
import { withTheme } from '@emotion/react'
import { Grid, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material'
// import NavbarUserDropdown from './NavbarUserDropdown'


const AppBar = styled(MuiAppBar)`
  background: #444243 !important;
  color: #fff !important;
`

function Navbar() {

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container alignItems="right">
          <Grid item />
          <Grid item>
           <Typography variant="h4" align="center">NF Theater </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default withTheme(Navbar)
