import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Backdrop, Box, Button, Card, CircularProgress, Container, Divider, Grid, IconButton, Link, Paper, TextField, Typography, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getCustomerProfile } from 'services/customer'
import { logout } from 'services/auth'
import toast from 'react-hot-toast'

export const Wrapper = styled(Card)`
  padding: 15px;
  margin-top: 20px;
`
export const DisabledField = styled(TextField)`
  .MuiInputBase-input:disabled {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
  }
  label.Mui-disabled {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
  }
`

export default function Profile(): JSX.Element {
  const useStyles = makeStyles({
    hideObject: {
      display: 'none',
    },
    center: {
      textAlign: 'center',
    }
  })
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [open, setOpen] = useState(true)
  const {data: customerProfile, refetch, isFetching} = useQuery('customer-profile', () => getCustomerProfile(),
  { cacheTime: 10 * (60 * 1000), staleTime: 5 * (60 * 1000) })
  const profile = customerProfile?.data
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    toast.promise(logout(), {
      loading: 'กำลัังโหลด',
      success: () => {
        return 'ออกจากระบบสำเร็จ'
      },
      error: (err) => {
        return err.data.message
      },
    })
  }

  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <React.Fragment>
      {isFetching ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ''
      )}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
      <br />
      <br />
        <Paper 
          elevation={24}
          variant="outlined"
          sx={{ 
            my: { xs: 3, md: 6 }, 
            p: { xs: 2, md: 3 }, 
            }}
          >
          <Typography component="h1" variant="h4" align="center">
            ข้อมูลสมาชิก
          </Typography>
          <br /><br />
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <Typography variant="h5" align="left">ไอดี</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <DisabledField
                type="text"
                fullWidth
                disabled
                variant="outlined"
                value={profile?.userId}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography variant="h5" align="left">แต้มแนะนำเพื่อน </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <DisabledField
                type="text"
                fullWidth
                disabled
                variant="outlined"
                value={profile?.invitingPoint}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography className={profile?.netflixPackageName === null ? classes.hideObject : ''} variant="h5" align="left">แพ็คเก็ต Netflix</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <DisabledField
                type="text"
                className={profile?.netflixPackageName === null ? classes.hideObject : ''}
                fullWidth
                disabled
                variant="outlined"
                value={profile?.netflixPackageName}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography className={profile?.netflixPackageName === null ? classes.hideObject : ''} variant="h5" align="left">จำนวนวันเหลือ</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <DisabledField
                type="text"
                className={profile?.netflixPackageName === null ? classes.hideObject : ''}
                fullWidth
                disabled
                variant="outlined"
                value={profile?.netflixDayLeft}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography className={profile?.netflixPackageName === null ? classes.hideObject : ''} variant="h5" align="left">Netflix Email</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
            <DisabledField
                type="text"
                className={profile?.netflixPackageName === null ? classes.hideObject : ''}
                fullWidth
                disabled
                variant="outlined"
                value={profile?.netflixEmail}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography className={profile?.netflixPackageName === null ? classes.hideObject : ''} variant="h5" align="left">Netflix Password</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
            <DisabledField
                type={showPassword ? 'text' : 'password'}
                className={profile?.netflixPackageName === null ? classes.hideObject : ''}
                fullWidth
                disabled
                variant="outlined"
                value={profile?.netflixPassword}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Divider />
            <Grid item xs={6} sm={6}>
              <Typography className={profile?.youtubePackageName === null ? classes.hideObject : ''} variant="h5" align="left">แพ็คเก็ต Youtube</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <DisabledField
                type="text"
                className={profile?.youtubePackageName === null ? classes.hideObject : ''}
                fullWidth
                disabled
                variant="outlined"
                value={profile?.youtubePackageName}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography className={profile?.youtubePackageName === null ? classes.hideObject : ''} variant="h5" align="left">จำนวนวันเหลือ</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <DisabledField
                type="text"
                className={profile?.youtubePackageName === null ? classes.hideObject : ''}
                fullWidth
                disabled
                variant="outlined"
                value={profile?.youtubeDayLeft}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={24} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                href="https://line.me/R/ti/p/@vrm3078o"
                target="blank"
                fullWidth
                size="large"
                variant="contained"
                >{profile?.netflixPackageName === null ? "สมัครแพ็คเกจ Netflix" : "ต่ออายุแพ็คเกจ Netflix"}
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                fullWidth
                href="https://line.me/R/ti/p/@vrm3078o"
                target="blank"
                size="large"
                variant="contained"
                >{profile?.youtubePackageName === null ? "สมัครแพ็คเกจ Youtube" : "ต่ออายุแพ็คเกจ Youtube"}
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                >ยืนยันสมาชิก
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                >ลุ้นรางวัล
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                fullWidth
                href="https://www.facebook.com/NFtheater"
                target="blank"
                size="large"
                variant="contained"
                >Facebook Page
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                >2 Button
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Button
          color="primary"
          fullWidth
          size="large"
          onClick={handleLogout}
          variant="contained"
          id="logout_btn"
        >
          ออกจากระบบ
        </Button>
      </Container>
    </React.Fragment>
  )
}