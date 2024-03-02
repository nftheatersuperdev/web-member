/* eslint-disable react/jsx-handler-names */
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import toast from 'react-hot-toast'
import { makeStyles } from '@mui/styles'
import { useEffect } from 'react'
import { useLiff } from 'react-liff'
import { login } from 'services/auth'

export default function Login(): JSX.Element {
  const history = useHistory()
  const { error, liff, isLoggedIn } = useLiff()
  const useStyles = makeStyles({
    paper: {
      borderRadius: '25px',
      border: '2px solid transparent',
      background:
        'linear-gradient(212.22deg, #FF0000 1.6%, #3A0000 100%) padding-box, linear-gradient(180deg, rgba(255, 254, 254, 0) 8.33%, rgba(255, 0, 0, 0.25) 100%) border-box',
      boxShadow: '0px 36px 51px 0px #00000094',
    },
    item: {
      padding: '0px 35px 0px 35px !important',
    },
    customInputTextField: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '25px',
        border: '0px solid',
        backgroundColor: '#00000033',
      },
      '& .MuiInputLabel-outlined': {
        marginTop: '-10px',
        transform: 'translate(14px, -6px) scale(0.75)',
        color: 'white',
        padding: '10px 20px 10px 20px',
        background: '#FF0000',
        border: '2px solid #FF0000',
        borderRadius: '20px',
      },
      '& .MuiOutlinedInput-input': {
        color: '#FFE600',
        fontFamily: 'Prompt',
        fontSize: '32px',
        fontWeight: 'bold',
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        marginTop: '-10px',
        color: 'white',
        padding: '10px 20px 10px 20px',
        background: '#FF0000',
        border: '2px solid #FF0000',
        borderRadius: '20px',
      },
    },
    button: {
      textAlign: 'center',
      padding: '35px 35px 35px 35px !important',
    },
    paddingZero: {
      padding: '0px !important',
      textAlign: 'center',
    },
    stickToBottom: {
      position: 'relative',
    },
    loginBtn: {
      width: '199px',
      fontFamily: 'Prompt',
      fontSize: '20px',
      borderRadius: '38px',
      background: 'linear-gradient(185.98deg, #FFA928 3.55%, #922D01 100%)',
      color: '#ffffff',
      '&:hover': {
        // backgroundColor: '#000000',
        backgroundColor: '#D1322F',
        opacity: [0.9, 0.8, 0.7],
      },
    },
  })
  const classes = useStyles()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        userId: '',
        password: '',
      },
      validationSchema: Yup.object().shape({
        userId: Yup.string().max(255).required('กรุณาระบุรหัสลูกค้า'),
        password: Yup.string().max(255).required('กรุณาระบุรหัสผ่าน'),
      }),
      onSubmit: (values, actions) => {
        // toast.promise(auth.signInWithEmailAndPassword(values.userId, values.password, true), {
        toast.promise(login(values.userId, values.password), {
          loading: 'กำลังเข้าสู่ระบบ',
          success: () => {
            actions.setSubmitting(false)
            history.replace('/profile')
            return 'เข้าสู่ระบบสำเร็จ'
          },
          error: (err) => {
            actions.setSubmitting(false)
            return err.data.message
          },
        })
      },
    })
  const formikVerifyCustomer = useFormik({
    initialValues: {
      phoneNumber: '0972223456',
      lineId: '',
      lineUserId: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      toast.success(JSON.stringify(values))
    },
  })
  const handleLinkLine = () => {
    if (!isLoggedIn) {
      liff.login()
    } else {
      (async () => {
        const profile = await liff.getProfile()
        toast.success('Line Profile : ' + profile.userId)
        formikVerifyCustomer.setFieldValue('lineId', profile.displayName)
        formikVerifyCustomer.setFieldValue('lineUserId', profile.userId)
        formikVerifyCustomer.submitForm()
      })()
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    ;(async () => {
      const profile = await liff.getProfile()
      toast.success('UseEffect Line Profile : ' + profile.userId)
      formikVerifyCustomer.setFieldValue('lineId', profile.displayName)
      formikVerifyCustomer.setFieldValue('lineUserId', profile.userId)
      formikVerifyCustomer.submitForm()
    })()
  }, [isLoggedIn, liff])

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <br />
      <Typography
        component="h1"
        variant="h4"
        align="center"
        style={{ fontFamily: 'Krona One', fontSize: '22px', fontWeight: '400', color: 'white' }}
      >
        NF THEATER
      </Typography>
      <br />
      <br />
      <Grid container spacing={1}>
        <Grid item xs={6} sm={6} className={classes.paddingZero}>
          <img src="./images/login_icon_img.png" />
        </Grid>
        <Grid item xs={6} sm={6} className={(classes.paddingZero, classes.stickToBottom)}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{
              fontFamily: 'Prompt',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#FFE600',
              position: 'absolute',
              bottom: '55px',
            }}
          >
            เข้าสู่ระบบ
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{
              fontFamily: 'Prompt',
              fontSize: '18px',
              fontWeight: '400',
              color: 'white',
              position: 'absolute',
              bottom: '10px',
            }}
          >
            สำหรับสมาชิกกรุณา <br />
            เข้าสู่ระบบด้านล่างนี้
          </Typography>
        </Grid>
      </Grid>
      <Paper
        className={classes.paper}
        elevation={24}
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} className={classes.item}>
              <TextField
                error={Boolean(touched.userId && errors.userId)}
                className={classes.customInputTextField}
                fullWidth
                helperText={touched.userId && errors.userId}
                label="ยูสเซอร์เนม"
                margin="normal"
                name="userId"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.userId}
                variant="outlined"
                id="login__userId_input"
              />
            </Grid>
            <Grid item xs={12} sm={12} className={classes.item}>
              <TextField
                error={Boolean(touched.password && errors.password)}
                className={classes.customInputTextField}
                fullWidth
                helperText={touched.password && errors.password}
                label="รหัสผ่าน"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
                id="login__password_input"
              />
            </Grid>
            <Grid item xs={12} sm={12} className={classes.button}>
              <Button
                className={classes.loginBtn}
                // color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                id="login__signin_btn"
              >
                เข้าสู่ระบบ
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
