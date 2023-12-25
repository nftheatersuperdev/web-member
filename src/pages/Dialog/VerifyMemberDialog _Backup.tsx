import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Button,
  DialogActions,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { GridTextField } from 'components/Styled'
import { verifyMember } from 'services/member'

interface VerifyMemberDialogProps {
  open: boolean
  lineId: string
  onClose: () => void
  onSuccess: () => void
}

export default function VerifyMemberDialog(props: VerifyMemberDialogProps): JSX.Element {
  const { open, lineId, onClose, onSuccess } = props
  const formikVerifyCustomer = useFormik({
    initialValues: {
      customerName: '',
      phoneNumber: '',
      lineId,
    },
    validationSchema: Yup.object().shape({
      customerName: Yup.string().required('กรุณาระบุชื่อ-นามสกุล'),
      phoneNumber: Yup.string().max(255).required('กรุณาระบุเบอร์โทรศัพท์'),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      toast.promise(verifyMember(values.customerName, values.phoneNumber, values.lineId), {
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
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     console.log('LIFF Line Login')
  //     liff.login()
  //     return
  //   }

  //   ;(async () => {
  //     const profile = await liff.getProfile()
  //     console.log(profile.userId)
  //   })()
  // }, [liff, isLoggedIn])

  return (
    <Dialog open={open} fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">ยืนยันสมาชิก</DialogTitle>
      <form onSubmit={formikVerifyCustomer.handleSubmit}>
        <DialogContent>
          <Grid container spacing={1}>
            <GridTextField item xs={12} sm={12}>
              <TextField
                type="text"
                name="customeName"
                id="verify_member__customerName"
                label="ชื่อ-นามสกุล"
                placeholder="กรุณาระบุชื่อ นามสกุลของท่าน"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formikVerifyCustomer.values.customerName}
                onChange={({ target }) =>
                  formikVerifyCustomer.setFieldValue('customerName', target.value)
                }
                error={Boolean(
                  formikVerifyCustomer.touched.customerName &&
                    formikVerifyCustomer.errors.customerName
                )}
                helperText={
                  formikVerifyCustomer.touched.customerName &&
                  formikVerifyCustomer.errors.customerName
                }
              />
            </GridTextField>
            <GridTextField item xs={12} sm={12}>
              <TextField
                type="text"
                name="mobilePhone"
                id="verify_member__mobileName"
                label="เบอร์โทรศัพท์"
                placeholder="กรุณาระบุเบอร์โทรศัพท์"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                onChange={({ target }) =>
                  formikVerifyCustomer.setFieldValue('phoneNumber', target.value)
                }
                value={formikVerifyCustomer.values.phoneNumber}
                error={Boolean(
                  formikVerifyCustomer.touched.phoneNumber &&
                    formikVerifyCustomer.errors.phoneNumber
                )}
                helperText={
                  formikVerifyCustomer.touched.phoneNumber &&
                  formikVerifyCustomer.errors.phoneNumber
                }
              />
            </GridTextField>
            <GridTextField item xs={12} sm={12}>
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
                error={Boolean(
                  formikVerifyCustomer.touched.lineId && formikVerifyCustomer.errors.lineId
                )}
                helperText={
                  formikVerifyCustomer.touched.lineId && formikVerifyCustomer.errors.lineId
                }
              />
            </GridTextField>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              formikVerifyCustomer.resetForm()
              onClose()
            }}
            variant="contained"
            id="logout_btn"
          >
            ยกเลิก
          </Button>
          <Button color="primary" variant="contained" type="submit">
            ยืนยันข้อมูล
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
