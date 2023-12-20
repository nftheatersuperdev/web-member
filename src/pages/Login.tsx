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
import { GridTextField } from 'components/Styled'
import { verifyMember } from 'services/member'

export default function Login(): JSX.Element {
  const history = useHistory()
  const { error, liff, isLoggedIn } = useLiff()
  const useStyles = makeStyles({
    item: {
      padding: '0px 35px 0px 35px !important',
    },
    button: {
      padding: '35px 35px 35px 35px !important',
    },
    loginBtn: {
      backgroundColor: '#E54E3D',
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
      toast.promise(verifyMember(values.phoneNumber, values.lineId, values.lineUserId), {
        loading: 'กำลังดำเนินการ',
        success: () => {
          formikVerifyCustomer.resetForm()
          return 'ยืนยันสมาชิกสำเร็จ'
        },
        error: (err) => {
          formikVerifyCustomer.resetForm()
          return 'ยืนยันสมาชิกไม่สำเร็จ เนื่องจาก ' + err.data.message
        },
      })
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
      <Paper elevation={24} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <br />
        <Typography component="h1" variant="h4" align="center">
          เข้าสู่ระบบ NF Theater
        </Typography>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} className={classes.item}>
              <TextField
                error={Boolean(touched.userId && errors.userId)}
                fullWidth
                helperText={touched.userId && errors.userId}
                label="รหัสลูกค้า"
                margin="normal"
                name="userId"
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
                ลงชื่อเข้าใช้งาน
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} className={classes.button}>
              <GridTextField item xs={8} sm={8}>
                <TextField
                  type="text"
                  name="lineId"
                  id="verify_member__lineId"
                  label="ไลน์ไอดี"
                  placeholder="กรุณาระบุไลน์ไอดี"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={formikVerifyCustomer.values.lineId}
                  onChange={({ target }) =>
                    formikVerifyCustomer.setFieldValue('lineId', target.value)
                  }
                />
              </GridTextField>
              <GridTextField item xs={4} sm={4}>
                <Button
                  color="primary"
                  onClick={() => {
                    handleLinkLine()
                  }}
                  variant="contained"
                  id="link_line_btn"
                >
                  เชื่อมต่อกับ Line
                </Button>
              </GridTextField>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
