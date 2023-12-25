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
  DialogActions,
  IconButton,
} from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useFormik } from 'formik'
import { useLiff } from 'react-liff'
import { makeStyles } from '@mui/styles'
import toast from 'react-hot-toast'
import { GridTextField } from 'components/Styled'
import { requestOtp, verifyMember, verifyOtp } from 'services/member'
import OTPInput from 'components/OTPInput'
import './App.css'

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
    <Dialog open={open} fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">ยืนยันสมาชิก</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <GridTextField item xs={8} sm={8}>
            <TextField
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
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            setEnableRequestOTPBtn(false)
            setEnableLinkLineBtn(false)
            setShowInputOTP(false)
            setEnableVerifyOTPBtn(false)
            formikVerifyCustomer.resetForm()
            onClose()
          }}
          variant="contained"
          id="close_btn"
        >
          ปิด
        </Button>
      </DialogActions>
    </Dialog>
  )
}
