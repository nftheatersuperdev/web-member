/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/forbid-component-props */
/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
} from '@mui/material'
import styled from 'styled-components'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useFormik } from 'formik'
import { useLiff } from 'react-liff'
import { makeStyles } from '@mui/styles'
import toast from 'react-hot-toast'
import { GridTextField } from 'components/Styled'
import { requestOtp, verifyMember, verifyOtp } from 'services/member'
import OTPInput from 'components/OTPInput'
import './App.css'

const CustomerDialogTitle = styled(DialogTitle)`
  font-weight: 700 !important;
  text-align: center !important;
  font-size: 28px !important;
  color: #fff;
  border: 1px solid black;
  width: 288px;
  height: 66px;
  margin-left: 150px !important;
  border-radius: 0px 0px 80px 80px;
  background: linear-gradient(212.22deg, #ff0000 1.6%, #3a0000 100%);
`
const CustomerDialog = styled(Dialog)`
  .MuiPaper-root { 
    border-radius: 25px;
    border: 2px solid black;
    background: linear-gradient(212.22deg, #FF0000 1.6%, #3A0000 100%);
    linear-gradient(180deg, rgba(255, 254, 254, 0) 8.33%, rgba(255, 0, 0, 0.25) 100%);
  }
`

interface VerifyMemberDialogProps {
  open: boolean
  isLineVerified: boolean
  lineId: string
  isPhoneVerified: boolean
  phoneNumber: string
  onClose: () => void
  onSuccess: () => void
}

export default function VerifyMemberDialog(props: VerifyMemberDialogProps): JSX.Element {
  const useStyles = makeStyles({
    hideObject: {
      display: 'none',
    },
    verifyTextBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      fontFamily: 'Prompt',
      fontSize: '18px',
      borderRadius: '38px',
      background: 'linear-gradient(185.98deg, #FFA928 3.55%, #922D01 100%)',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#D1322F',
        opacity: [0.9, 0.8, 0.7],
      },
    },
    customInputTextField: {
      '& .Mui-disabled': {
        '-webkit-text-fill-color': 'rgba(254, 254, 0, 1)',
      },
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
  })
  const { isLoggedIn, liff } = useLiff()
  const classes = useStyles()
  const { open, isLineVerified, lineId, isPhoneVerified, phoneNumber, onClose, onSuccess } = props
  const [showInputOTP, setShowInputOTP] = useState(false)
  const [enableRequestOTPBtn, setEnableRequestOTPBtn] = useState(false)
  const [enableVerifyOTPBtn, setEnableVerifyOTPBtn] = useState(false)
  const [enableLinkLineBtn, setEnableLinkLineBtn] = useState(false)
  const [refCode, setRefCode] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const handleRequestOTP = () => {
    toast.promise(requestOtp(formikVerifyCustomer.values.phoneNumber), {
      loading: 'กำลังดำเนินการ',
      success: (res) => {
        setShowInputOTP(true)
        setEnableRequestOTPBtn(false)
        setRefCode(res)
        return 'ขอรับรหัส OTP สำเร็จ'
      },
      error: (err) => {
        return 'ขอรับรหัส OTP ไม่สำเร็จ เนื่องจาก ' + err.data.message
      },
    })
  }
  const handleVerifyOTP = () => {
    toast.promise(verifyOtp(otpValue, refCode), {
      loading: 'กำลังดำเนินการ',
      success: () => {
        setEnableVerifyOTPBtn(false)
        setShowInputOTP(false)

        return 'ยืนยันรหัส OTP สำเร็จ'
      },
      error: (err) => {
        return 'ยิืนยันรหัส OTP ไม่สำเร็จ เนื่องจาก ' + err.data.message
      },
    })
  }
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
        setEnableLinkLineBtn(false)
      })()
    }
  }
  const formikVerifyCustomer = useFormik({
    initialValues: {
      phoneNumber,
      lineId,
      lineUserId: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      toast.promise(verifyMember(values.phoneNumber, values.lineId, values.lineUserId), {
        loading: 'กำลังดำเนินการ',
        success: () => {
          formikVerifyCustomer.resetForm()
          // onClose()
          onSuccess()
          return 'ยืนยันสมาชิกสำเร็จ'
        },
        error: (err) => {
          formikVerifyCustomer.resetForm()
          onClose()
          return 'ยืนยันสมาชิกไม่สำเร็จ เนื่องจาก ' + err.data.message
        },
      })
    },
  })

  return (
    <CustomerDialog open={open} fullWidth aria-labelledby="form-dialog-title">
      <CustomerDialogTitle id="form-dialog-title">
        ยืนยันสมาชิก
        <img
          src="./images/button_close.png"
          onClick={() => {
            setEnableRequestOTPBtn(false)
            setEnableLinkLineBtn(false)
            setShowInputOTP(false)
            setEnableVerifyOTPBtn(false)
            formikVerifyCustomer.resetForm()
            onClose()
          }}
          style={{
            cursor: 'pointer',
            float: 'right',
            marginTop: '-20px',
            marginRight: '-185px',
            width: '45px',
          }}
        />
      </CustomerDialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <GridTextField item xs={6} sm={6}>
            <img src="./images/verify.png" />
          </GridTextField>
          <GridTextField item xs={6} sm={6} className={classes.verifyTextBox}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              style={{
                fontFamily: 'Prompt',
                fontSize: '22px',
                color: 'white',
              }}
            >
              ตรวจสอบความถูกต้อง <br/> และยืนยันข้อมูล
            </Typography>
          </GridTextField>
          <GridTextField item xs={8} sm={8}>
            <TextField
              className={classes.customInputTextField}
              type="number"
              name="mobilePhone"
              id="verify_member__mobileName"
              label="เบอร์โทรศัพท์"
              placeholder="กรุณาระบุเบอร์โทรศัพท์เพื่อรับรหัสใช้ครั้งเดียว"
              fullWidth
              variant="outlined"
              disabled={showInputOTP || isPhoneVerified}
              InputLabelProps={{ shrink: true }}
              onChange={({ target }) => {
                formikVerifyCustomer.setFieldValue('phoneNumber', target.value)
                if (target.value.length === 10) {
                  setEnableRequestOTPBtn(true)
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton style={{ color: 'green' }} edge="end">
                    {isPhoneVerified ? <VerifiedIcon /> : ''}
                  </IconButton>
                ),
              }}
              value={formikVerifyCustomer.values.phoneNumber}
            />
          </GridTextField>
          <GridTextField item xs={4} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              className={classes.button}
              color="primary"
              disabled={!enableRequestOTPBtn}
              onClick={() => {
                handleRequestOTP()
              }}
              variant="contained"
              id="request_otp_btn"
            >
              รับรหัส OTP
            </Button>
          </GridTextField>
          <GridTextField item xs={12} sm={12} className={showInputOTP ? '' : classes.hideObject}>
            <div className="App">
              <OTPInput
                autoFocus
                isNumberInput
                length={4}
                className="otpContainer"
                inputClassName="otpInput"
                refCode={refCode}
                onChangeOTP={(otp) => {
                  if (otp.length === 4) {
                    setOtpValue(otp)
                    setEnableVerifyOTPBtn(true)
                  }
                }}
              />
            </div>
          </GridTextField>
          <GridTextField
            item
            xs={12}
            sm={12}
            className={showInputOTP ? '' : classes.hideObject}
            style={{ marginBottom: '5%', textAlign: 'center' }}
          >
            <Button
              color="primary"
              disabled={!enableVerifyOTPBtn}
              onClick={() => {
                handleVerifyOTP()
              }}
              variant="contained"
              id="verify_otp_btn"
            >
              ยืนยัน OTP
            </Button>
          </GridTextField>
          <GridTextField item xs={8} sm={8}>
            <TextField
              type="text"
              name="lineId"
              className={classes.customInputTextField}
              disabled={isLoggedIn || isLineVerified}
              id="verify_member__lineId"
              label="ไลน์ไอดี"
              placeholder="กรุณาระบุไลน์ไอดี"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formikVerifyCustomer.values.lineId}
              onChange={({ target }) => formikVerifyCustomer.setFieldValue('lineId', target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton style={{ color: 'green' }} edge="end">
                    {isLineVerified ? <VerifiedIcon /> : ''}
                  </IconButton>
                ),
              }}
            />
          </GridTextField>
          <GridTextField item xs={4} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              className={classes.button}
              color="primary"
              disabled={enableLinkLineBtn || isLineVerified}
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
      </DialogContent>
    </CustomerDialog>
  )
}
