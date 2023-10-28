/* eslint-disable react/forbid-component-props */
import { VisibilityOff, Visibility, ContentCopy } from '@mui/icons-material'
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
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
  const [lineUserIdParam, setLineUserIdParam] = useState<string>('')
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
  const verifyMember = () => {
    if (!isLoggedIn) {
      liff.login()
    } else {
      ;(async () => {
        const profile = await liff.getProfile()
        toast.success('Line Profile : ' + profile.userId)
        setLineUserIdParam(profile.userId)
        setOpenVerifyMemberDialog(true)
      })()
    }
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
          <br />
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" align="left">
                ไอดี: {profile?.userId}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" align="left">
                คะแนนสะสม​: {profile?.memberPoint} คะแนน
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              {profile?.netflixPackageName === null ? (
                ''
              ) : (
                <Typography variant="h5" align="left">
                  แพ็คเกจ Netflix: {profile?.netflixPackageName}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              {profile?.netflixPackageName === null ? (
                ''
              ) : (
                <Typography variant="h5" align="left">
                  จำนวนวันเหลือ: {profile?.netflixDayLeft}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              {profile?.netflixPackageName === null ? (
                ''
              ) : (
                <Typography variant="h5" align="left">
                  อีเมลล์ Netflix
                </Typography>
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              {profile?.netflixPackageName === null ? (
                ''
              ) : (
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
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              {profile?.netflixPackageName === null ? (
                ''
              ) : (
                <Typography variant="h5" align="left">
                  รหัสผ่าน Netflix
                </Typography>
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              {profile?.netflixPackageName === null ? (
                ''
              ) : (
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
              )}
            </Grid>
            <Divider style={{ background: 'black' }} variant="middle" />
            <Grid item xs={6} sm={6}>
              {profile?.youtubePackageName === null ? (
                ''
              ) : (
                <Typography variant="h5" align="left">
                  แพ็คเกจ Youtube
                </Typography>
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              {profile?.youtubePackageName === null ? (
                ''
              ) : (
                <DisabledField
                  type="text"
                  fullWidth
                  disabled
                  variant="outlined"
                  value={profile?.youtubePackageName}
                />
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography
                className={profile?.youtubePackageName === null ? classes.hideObject : ''}
                variant="h5"
                align="left"
              >
                จำนวนวันเหลือ
              </Typography>
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
            <Grid item xs={12} sm={12} />
          </Grid>
        </Paper>
        <Paper elevation={24} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={6} sm={6}>
              {profile?.netflixPackageName === null ? (
                <Button
                  color="primary"
                  href="https://line.me/R/ti/p/@vrm3078o"
                  target="blank"
                  fullWidth
                  size="large"
                  variant="contained"
                >
                  สมัครแพ็คเกจ Netflix
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={() => setOpenNetflixPackageDialog(true)}
                  fullWidth
                  size="large"
                  variant="contained"
                >
                  ต่ออายุแพ็คเกจ Netflix
                </Button>
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              {profile?.youtubePackageName === null ? (
                <Button
                  color="primary"
                  fullWidth
                  href="https://line.me/R/ti/p/@vrm3078o"
                  target="blank"
                  size="large"
                  variant="contained"
                >
                  สมัครแพ็คเกจ Youtube
                </Button>
              ) : (
                <Button
                  color="primary"
                  fullWidth
                  onClick={() => setOpenYoutubePackageDialog(true)}
                  size="large"
                  variant="contained"
                >
                  ต่ออายุแพ็คเกจ Youtube
                </Button>
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                // onClick={() => setOpenVerifyMemberDialog(true)}
                onClick={() => verifyMember()}
              >
                ยืนยันสมาชิก
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                onClick={() => setOpenRewardDialog(true)}
              >
                ลุ้นรางวัล
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                fullWidth
                href="https://lin.ee/AmPbEF2"
                target="blank"
                size="large"
                variant="contained"
              >
                แก้ไขปัญหาการใช้งาน
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                onClick={() => setOpenVerifySuccessDialog(true)}
              >
                ชวนเพื่อนเข้าตี้ รับแต้มฟรี
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
      <VerifyMemberDialog
        open={openVerifyMemberDialog}
        lineId={lineUserIdParam}
        onClose={() => setOpenVerifyMemberDialog(false)}
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
