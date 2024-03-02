/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/forbid-component-props */
import { VisibilityOff, Visibility, ContentCopy, ContactPage, Stars } from '@mui/icons-material'
import {
  Backdrop,
  Button,
  ButtonBase,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLiff } from 'react-liff'
import { makeStyles } from '@mui/styles'
import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { getMemberProfile } from 'services/member'
import { logout } from 'services/auth'
import { copyText } from 'components/copyContent'
import VerifyMemberDialog from './Dialog/VerifyMemberDialog'
import VerifySuccessDialog from './Dialog/VerifySuccessDialog'
import RewardDialog from './Dialog/RewardDialog'
import RewardListDialog from './Dialog/RewardListDialog'
import NetflixPackageDialog from './Dialog/NetflixPackageDialog'
import YoutubePackageDialog from './Dialog/YoutubePackageDialog'

export const Wrapper = styled(Card)`
  padding: 15px;
  margin-top: 20px;
`
export const DisabledField = styled(TextField)`
  background-color: rgba(0, 0, 0, 0.21);
  .MuiInputBase-input:disabled {
    -webkit-text-fill-color: white !important;
  }
  label.Mui-disabled {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
  }
`
const ImageButton = styled(ButtonBase)`
  position: 'relative',
  height: 200,
`

export const ImageSrc = styled('span')`
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
`

export const Divider = styled('div')`
  border: '1px solid gray',
  borderBottom: '1px',
  borderLeft: '1px',
  borderRight: '1px',  
`

export default function Profile(): JSX.Element {
  const useStyles = makeStyles({
    hideObject: {
      display: 'none',
    },
    center: {
      textAlign: 'center',
    },
  })
  const classes = useStyles()
  const { isLoggedIn, liff } = useLiff()
  const [showPassword, setShowPassword] = useState(false)
  const [openVerifyMemberDialog, setOpenVerifyMemberDialog] = useState(false)
  const [openVerifySuccessDialog, setOpenVerifySuccessDialog] = useState(false)
  const [openRewardListDialog, setOpenRewardListDialog] = useState(false)
  const [openRewardDialog, setOpenRewardDialog] = useState(false)
  const [openNetflixPackageDialog, setOpenNetflixPackageDialog] = useState(false)
  const [openYoutubePackageDialog, setOpenYoutubePackageDialog] = useState(false)
  const [open, setOpen] = useState(true)
  const {
    data: customerProfile,
    refetch,
    isFetching,
  } = useQuery('customer-profile', () => getMemberProfile(), {
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  })
  const profile = customerProfile?.data
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClose = () => {
    setOpen(false)
  }
  const copyContent = (email: string, password: string) => {
    const text = email.concat(' ').concat(password)
    copyText(text)
  }
  const handleLogout = () => {
    liff.logout()
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
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <br />
        <Grid
          spacing={3}
          container
          xs={12}
          sm={12}
          style={{ display: 'grid', placeItems: 'center' }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ fontFamily: 'Krona One', fontSize: '22px', fontWeight: '400', color: 'white' }}
          >
            NF THEATER
          </Typography>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={1} sm={1}>
            <IconButton>
              <ContactPage style={{ color: 'white' }} />
            </IconButton>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography variant="h5" align="left">
              <div style={{ color: 'white', fontSize: '16px' }}>ไอดี</div>
              <div style={{ color: 'yellow', fontSize: '16px', fontWeight: 'bolder' }}>
                {profile?.userId}
              </div>
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <img src="./images/profile.png" />
          </Grid>
          <Grid item xs={1} sm={1}>
            <IconButton>
              <Stars style={{ color: 'white' }} />
            </IconButton>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography variant="h5" align="left">
              <div style={{ color: 'white', fontSize: '16px' }}>แต้มแนะนำเพื่อน</div>
              <div style={{ color: 'yellow', fontSize: '16px', fontWeight: 'bolder' }}>
                {profile?.memberPoint}
              </div>
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Paper
          elevation={24}
          variant="outlined"
          style={{
            backgroundColor: 'transparent',
            background: 'linear-gradient(212.22deg, #FF0000 1.6%, #3A0000 100%)',
            borderRadius: '30px',
          }}
        >
          <Grid container spacing={3}>
            <br />
            <br />
            <Grid
              item
              xs={12}
              sm={12}
              style={{ marginRight: '15px' }}
              className={profile?.netflixPackageName === null ? classes.hideObject : ''}
            >
              <table style={{ width: '100%' }}>
                <tr>
                  <td rowSpan={3} style={{ verticalAlign: 'top' }}>
                    <img style={{ width: '60px' }} src="/logo-netflix.png" />
                  </td>
                  <td>
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        fontSize: '22px',
                        fontWeight: '400',
                        color: 'white',
                      }}
                    >
                      แพ็คเกจ NETFLIX <br /> {profile?.netflixPackageName}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        fontSize: '22px',
                        fontWeight: '400',
                        color: 'white',
                        textAlign: 'right',
                      }}
                    >
                      เหลือวันใช้งาน <br /> {profile?.netflixDayLeft}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <DisabledField
                      type="text"
                      style={{ WebkitTextFillColor: 'white !important' }}
                      fullWidth
                      disabled
                      variant="outlined"
                      value={'Email : ' + profile?.netflixEmail}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              copyContent(`${profile?.netflixEmail}`, `${profile?.netflixPassword}`)
                            }
                            edge="end"
                          >
                            <ContentCopy style={{ color: 'white' }} />
                          </IconButton>
                        ),
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <DisabledField
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      disabled
                      variant="outlined"
                      value={'Password : ' + profile?.netflixPassword}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff style={{ color: 'white' }} />
                            ) : (
                              <Visibility style={{ color: 'white' }} />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </td>
                </tr>
              </table>
            </Grid>
            {/* <Grid
              item
              xs={12}
              sm={12}
              style={{ border: '1px solid white' }}
              className={profile?.netflixPackageName === null ? classes.hideObject : ''}
            >
              <Typography
                variant="h5"
                align="left"
                style={{
                  fontSize: '22px',
                  fontWeight: '400',
                  color: 'white',
                }}
              >
                แพ็คเกจ NETFLIX: {profile?.netflixPackageName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              style={{ border: '1px solid white' }}
              className={profile?.netflixPackageName === null ? classes.hideObject : ''}
            >
              <Typography
                variant="h5"
                align="left"
                style={{
                  fontSize: '22px',
                  fontWeight: '400',
                  color: 'white',
                }}
              >
                จำนวนวันเหลือ: {profile?.netflixDayLeft}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              style={{ border: '1px solid white' }}
              className={profile?.netflixPackageName === null ? classes.hideObject : ''}
            >
              <Typography
                variant="h5"
                align="left"
                style={{
                  fontSize: '22px',
                  fontWeight: '400',
                  color: 'white',
                }}
              >
                อีเมลล์ NETFLIX
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              style={{ border: '1px solid white' }}
              className={profile?.netflixPackageName === null ? classes.hideObject : ''}
            >
              <DisabledField
                type="text"
                fullWidth
                disabled
                variant="outlined"
                value={profile?.netflixEmail}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        copyContent(`${profile?.netflixEmail}`, `${profile?.netflixPassword}`)
                      }
                      edge="end"
                    >
                      <ContentCopy />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              className={profile?.netflixPackageName === null ? classes.hideObject : ''}
            >
              <Typography
                variant="h5"
                align="left"
                style={{
                  fontSize: '22px',
                  fontWeight: '400',
                  color: 'white',
                }}
              >
                รหัสผ่าน NETFLIX
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              className={profile?.netflixPackageName === null ? classes.hideObject : ''}
            >
              <DisabledField
                type={showPassword ? 'text' : 'password'}
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
            </Grid> */}
            <Grid
              item
              xs={12}
              sm={12}
              style={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}
            >
              <div
                style={{
                  width: '80%',
                  border: '1px solid white',
                  borderBottom: '1px',
                  borderLeft: '1px',
                  borderRight: '1px',
                }}
              />
            </Grid>
            <br />
            <Grid
              item
              xs={12}
              sm={12}
              style={{ marginRight: '15px' }}
              className={profile?.youtubePackageName === null ? classes.hideObject : ''}
            >
              <table style={{ width: '100%' }}>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <img
                      style={{
                        marginLeft: '10px',
                        width: '45px',
                      }}
                      src="/logo-youtube.png"
                    />
                  </td>
                  <td>
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        fontSize: '22px',
                        fontWeight: '400',
                        color: 'white',
                      }}
                    >
                      แพ็คเกจ YOUTUBE <br /> {profile?.youtubePackageName}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        fontSize: '22px',
                        fontWeight: '400',
                        color: 'white',
                        textAlign: 'right',
                      }}
                    >
                      เหลือวันใช้งาน <br /> {profile?.youtubeDayLeft}
                    </Typography>
                  </td>
                </tr>
              </table>
              {/* <Typography
                variant="h5"
                align="left"
                style={{
                  fontSize: '22px',
                  fontWeight: '400',
                  color: 'white',
                }}
              >
                แพ็คเกจ YOUTUBE
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              className={profile?.youtubePackageName === null ? classes.hideObject : ''}
            >
              <DisabledField
                type="text"
                fullWidth
                disabled
                variant="outlined"
                value={profile?.youtubePackageName}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              className={profile?.youtubePackageName === null ? classes.hideObject : ''}
            >
              <Typography
                className={profile?.youtubePackageName === null ? classes.hideObject : ''}
                variant="h5"
                align="left"
                style={{
                  fontSize: '22px',
                  fontWeight: '400',
                  color: 'white',
                }}
              >
                จำนวนวันเหลือ
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              className={profile?.youtubePackageName === null ? classes.hideObject : ''}
            >
              <DisabledField
                type="text"
                className={profile?.youtubePackageName === null ? classes.hideObject : ''}
                fullWidth
                disabled
                variant="outlined"
                value={profile?.youtubeDayLeft}
              /> */}
            </Grid>
            <Grid item xs={12} sm={12} />
          </Grid>
        </Paper>
        <Paper
          elevation={24}
          variant="outlined"
          style={{ backgroundColor: 'transparent' }}
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={6} sm={6}>
              {profile?.youtubePackageName === null ? (
                <a href="https://line.me/R/ti/p/@vrm3078o" target="blank">
                  <img style={{ width: '100%' }} src="./images/NF1.png" />
                </a>
              ) : (
                // <Button
                //   color="primary"
                //   fullWidth
                //   href="https://line.me/R/ti/p/@vrm3078o"
                //   target="blank"
                //   size="large"
                //   variant="contained"
                // >
                //   สมัครแพ็คเกจ Youtube
                // </Button>
                <img
                  style={{ width: '100%' }}
                  src="./images/NF1.png"
                  onClick={() => setOpenYoutubePackageDialog(true)}
                />
                // <Button
                //   color="primary"
                //   fullWidth
                //   onClick={() => setOpenYoutubePackageDialog(true)}
                //   size="large"
                //   variant="contained"
                // >
                //   ต่ออายุแพ็คเกจ Youtube
                // </Button>
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              {profile?.netflixPackageName === null ? (
                <a href="https://line.me/R/ti/p/@vrm3078o" target="blank">
                  <img style={{ width: '100%' }} src="./images/NF2.png" />
                </a>
              ) : (
                // <Button
                //   color="primary"
                //   href="https://line.me/R/ti/p/@vrm3078o"
                //   target="blank"
                //   fullWidth
                //   size="large"
                //   variant="contained"
                // >
                //   สมัครแพ็คเกจ Netflix
                // </Button>
                <img
                  style={{ width: '100%' }}
                  src="./images/NF2.png"
                  onClick={() => setOpenNetflixPackageDialog(true)}
                />
                // <Button
                //   color="primary"
                //   onClick={() => setOpenNetflixPackageDialog(true)}
                //   fullWidth
                //   size="large"
                //   variant="contained"
                // >
                //   ต่ออายุแพ็คเกจ Netflix
                // </Button>
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              <img
                style={{ width: '100%' }}
                src="./images/NF3.png"
                onClick={() => setOpenVerifyMemberDialog(true)}
              />
              {/* <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                onClick={() => setOpenVerifyMemberDialog(true)}
                // onClick={() => verifyMember()}
              >
                ยืนยันสมาชิก
              </Button> */}
            </Grid>
            <Grid item xs={6} sm={6}>
              <img
                style={{ width: '100%' }}
                src="./images/NF4.png"
                onClick={() => setOpenRewardDialog(true)}
              />
              {/* <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
              >
                ลุ้นรางวัล
              </Button> */}
            </Grid>
            <Grid item xs={6} sm={6}>
              <img
                style={{ width: '100%' }}
                src="./images/NF5.png"
                onClick={() => setOpenVerifySuccessDialog(true)}
              />
              {/* <Button
                color="primary"
                fullWidth
                href="https://lin.ee/AmPbEF2"
                target="blank"
                size="large"
                variant="contained"
              >
                แก้ไขปัญหาการใช้งาน
              </Button> */}
            </Grid>
            <Grid item xs={6} sm={6}>
              <a href="https://lin.ee/AmPbEF2" target="blank">
                <img style={{ width: '100%' }} src="./images/NF6.png" />
              </a>
              {/* <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                onClick={() => setOpenVerifySuccessDialog(true)}
              >
                ชวนเพื่อนเข้าตี้ รับแต้มฟรี
              </Button> */}
            </Grid>
          </Grid>
        </Paper>
        <Button
          fullWidth
          size="large"
          onClick={handleLogout}
          style={{
            border: '1px solid rgba(62, 72, 94, 1)',
            borderRadius: '57px',
            color: 'rgba(85, 92, 109, 1)',
          }}
          id="logout_btn"
        >
          ออกจากระบบ
        </Button>
      </Container>
      <VerifyMemberDialog
        open={openVerifyMemberDialog}
        isLineVerified={profile?.isLineVerified ? profile.isLineVerified : false}
        lineId={profile?.lineId ? profile.lineId : ''}
        isPhoneVerified={profile?.isPhoneVerified ? profile.isPhoneVerified : false}
        phoneNumber={profile?.phoneNumber ? profile.phoneNumber : ''}
        onClose={() => {
          refetch()
          setOpenVerifyMemberDialog(false)
        }}
        onSuccess={() => {
          setOpenVerifyMemberDialog(false)
          setOpenVerifySuccessDialog(true)
        }}
      />
      <VerifySuccessDialog
        open={openVerifySuccessDialog}
        onClose={() => {
          refetch()
          setOpenVerifySuccessDialog(false)
        }}
      />
      <RewardDialog
        open={openRewardDialog}
        onClose={() => setOpenRewardDialog(false)}
        onOpenRewardList={() => {
          setOpenRewardDialog(false)
          setOpenRewardListDialog(true)
        }}
      />
      <RewardListDialog
        open={openRewardListDialog}
        onClose={() => {
          refetch()
          setOpenRewardListDialog(false)
        }}
      />
      <NetflixPackageDialog
        open={openNetflixPackageDialog}
        onClose={() => setOpenNetflixPackageDialog(false)}
      />
      <YoutubePackageDialog
        open={openYoutubePackageDialog}
        onClose={() => setOpenYoutubePackageDialog(false)}
      />
    </React.Fragment>
  )
}
