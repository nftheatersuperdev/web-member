/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/forbid-component-props */
import { ContentCopy } from '@mui/icons-material'
import {
  Backdrop,
  Box,
  Button,
  // ButtonBase,
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
import Divider from '@material-ui/core/Divider'
import React, { useEffect, useState } from 'react'
import { useLiff } from 'react-liff'
import { makeStyles } from '@mui/styles'
import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { getMemberProfile } from 'services/member'
import { logout } from 'services/auth'
import { copyText } from 'components/copyContent'
import VerifyMemberDialog from './Dialog/VerifyMemberDialog'
import VerifySuccessDialog from './Dialog/VerifySuccessDialog'
import RewardDialog from './Dialog/RewardDialog'
import RewardListDialog from './Dialog/RewardListDialog'
import NetflixPackageDialog from './Dialog/NetflixPackageDialog'
import YoutubePackageDialog from './Dialog/YoutubePackageDialog'
import PaymentDialog from './Dialog/PaymentDialog'
import PaymentSuccessDialog from './Dialog/PaymentSuccessDialog'

export const Wrapper = styled(Card)`
  padding: 15px;
  margin-top: 20px;
`
export const DisabledField = styled(TextField)`
  background-color: rgba(0, 0, 0, 0.21);
  margin-top: 2px;
  border-radius: 10px;
  .MuiOutlinedInput-input {
    padding: 0 10px;
  }
  .MuiInputBase-input:disabled {
    -webkit-text-fill-color: white !important;
    padding: 0px 10 px !important;
    font-size: 14px !important;
  }
  label.Mui-disabled {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
  }
  .Mui-disabled .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0);
  }
`

export const LabelWrapper = styled('div')`
  margin-top: 2px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.21);
  border-color: rgba(0, 0, 0, 0);
  padding: 5px 10px;
`

// const ImageButton = styled(ButtonBase)`
//   position: 'relative',
//   height: 200,
// `

export const ImageSrc = styled('span')`
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
`

export interface DialogParam {
  id: string
}

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
  const { liff } = useLiff()
  // const [showPassword, setShowPassword] = useState(false)
  const [openVerifyMemberDialog, setOpenVerifyMemberDialog] = useState(false)
  const [openVerifySuccessDialog, setOpenVerifySuccessDialog] = useState(false)
  const [openRewardListDialog, setOpenRewardListDialog] = useState(false)
  const [openRewardDialog, setOpenRewardDialog] = useState(false)
  const [openNetflixPackageDialog, setOpenNetflixPackageDialog] = useState(false)
  const [openYoutubePackageDialog, setOpenYoutubePackageDialog] = useState(false)
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false)
  const searchParams = useLocation().search
  const queryString = new URLSearchParams(searchParams)
  const isPaymentSuccessParam = queryString.get('isPaymentSuccess')
  const [openPaymentSuccessDialog, setOpenPaymentSuccessDialog] = useState(
    isPaymentSuccessParam !== undefined && isPaymentSuccessParam === 'true' ? true : false
  )
  const [selectedPackageId, setSelectedPackageId] = useState<string>('')
  const [selectedPackageName, setSelectedPackageName] = useState<string>('')
  const [selectedPackagePrice, setSelectedPackagePrice] = useState<number>(0)
  const [open, setOpen] = useState(true)
  const {
    data: customerProfile,
    refetch,
    isFetching,
  } = useQuery('customer-profile', () => getMemberProfile(), {
    refetchOnWindowFocus: false,
  })
  const profile = customerProfile?.data
  // const handleClickShowPassword = () => setShowPassword((show) => !show)
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
  console.log("payment: " + isPaymentSuccessParam)
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
        <Box style={{ textAlign: 'center', marginBottom: 20 }}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ fontFamily: 'Krona One', fontSize: '22px', fontWeight: '400', color: 'white' }}
          >
            NF THEATER
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '30%' }}>
            <img src="./images/icon_id.png" style={{ height: '30px', marginRight: 10 }} />
            <Typography variant="h5" align="left">
              <div style={{ color: 'white', fontSize: '14px' }}>ไอดี</div>
              <div style={{ color: 'yellow', fontSize: '14px', fontWeight: 'bolder' }}>
                {profile?.userId}
              </div>
            </Typography>
          </Box>
          <Box>
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                width: '100%',
              }}
            >
              <img
                style={{
                  padding: '0 10px',
                  background: 'linear-gradient(rgba(39, 8, 36, 1), rgba(7, 14, 23, 1))',
                  borderRadius: '360px',
                }}
                src="./images/profile.png"
              />
            </div>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 0,
              width: '30%',
            }}
          >
            <img src="./images/icon_point.png" height={30} style={{ marginRight: 10 }} />
            <Typography variant="h5" align="left">
              <div style={{ color: 'white', fontSize: '14px' }}>คะแนนสะสม</div>
              <div style={{ color: 'yellow', fontSize: '14px', fontWeight: 'bolder' }}>
                {profile?.memberPoint}
              </div>
            </Typography>
          </Box>
        </Box>
        <Box
          style={{
            background:
              'linear-gradient(204deg, rgba(255,0,0,1) 0%, rgba(121,9,9,1) 72%, rgba(68,49,49,1) 100%)',
            width: '100%',
            marginTop: '-55px',
            borderRadius: '24px',
          }}
        >
          <Box sx={{ paddingTop: '50px', paddingBottom: '10px' }}>
            <Box
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '10px 20px 10px 10px',
              }}
            >
              <Box style={{ verticalAlign: 'top', marginRight: '10px', maxWidth: '20%' }}>
                <img style={{ width: '100%', maxWidth: 60 }} src="/logo-netflix.png" />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0', maxWidth: '80%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        fontSize: '14px',
                        fontWeight: '400',
                        color: 'white',
                      }}
                    >
                      แพ็คเกจ NETFLIX
                    </Typography>
                    <Typography
                      variant="h5"
                      align="left"
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {profile?.netflixPackageName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                    <div>
                      <Typography
                        variant="h5"
                        align="left"
                        style={{
                          fontSize: '14px',
                          fontWeight: '400',
                          color: 'white',
                          textAlign: 'right',
                        }}
                      >
                        วันใช้งาน
                      </Typography>
                      <Typography
                        variant="h5"
                        align="left"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: 'white',
                          textAlign: 'right',
                        }}
                      >
                        {profile?.netflixDayLeft}
                      </Typography>
                    </div>
                  </Box>
                </Box>
                <div style={{ marginTop: '10px' }}>
                  <LabelWrapper
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        maxWidth: '80%',
                      }}
                    >
                      <span
                        style={{
                          flex: '1 0',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#FF7373',
                          marginRight: '5px',
                        }}
                      >
                        {'Email: '}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: '400',
                          color: 'white',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {profile?.netflixEmail}
                      </span>
                    </div>
                    <IconButton
                      aria-label="toggle password visibility"
                      style={{ padding: '3px 10px ' }}
                      onClick={() =>
                        copyContent(`${profile?.netflixEmail}`, `${profile?.netflixPassword}`)
                      }
                      edge="end"
                    >
                      <ContentCopy style={{ color: 'white' }} fontSize="small" />
                    </IconButton>
                  </LabelWrapper>
                  <LabelWrapper
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        maxWidth: '80%',
                      }}
                    >
                      <span
                        style={{
                          flex: '1 0',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#FF7373',
                          marginRight: '5px',
                        }}
                      >
                        {'Password: '}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: '400',
                          color: 'white',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        **********
                      </span>
                    </div>
                    <IconButton
                      aria-label="toggle password visibility"
                      style={{ padding: '3px 10px ' }}
                      onClick={() =>
                        copyContent(`${profile?.netflixEmail}`, `${profile?.netflixPassword}`)
                      }
                      edge="end"
                    >
                      <ContentCopy style={{ color: 'white' }} fontSize="small" />
                    </IconButton>
                  </LabelWrapper>
                </div>
              </Box>
            </Box>
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
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Divider style={{ backgroundColor: 'rgba(255,255,255,0.3' }} variant="middle" />
            </div>
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
          </Box>
        </Box>
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
        onOpenRewardList={() => {
          setOpenVerifySuccessDialog(false)
          setOpenRewardListDialog(true)
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
        onOpenPayment={(id: string, name: string, price: number) => {
          setOpenNetflixPackageDialog(false)
          setOpenPaymentDialog(true)
          setSelectedPackageId(id)
          setSelectedPackageName(name)
          setSelectedPackagePrice(price)
        }}
      />
      <YoutubePackageDialog
        open={openYoutubePackageDialog}
        onClose={() => setOpenYoutubePackageDialog(false)}
      />
      <PaymentDialog
        open={openPaymentDialog}
        onClose={() => {
          setOpenPaymentDialog(false)
        }}
        packageId={selectedPackageId}
        packageName={selectedPackageName}
        price={selectedPackagePrice}
      />
      <PaymentSuccessDialog
        open={openPaymentSuccessDialog}
        onClose={() => setOpenPaymentSuccessDialog(false)}
      />
    </React.Fragment>
  )
}
