/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-template-curly-in-string */
import { Button, Dialog, DialogContent, Grid, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { GridTextField } from 'components/Styled'
import { createPayment } from 'services/member'
import { CreatePaymentRequest, CreatePaymentResponse } from 'services/member-type'

interface PaymentDialogProps {
  open: boolean
  onClose: () => void
  packageId: string
  packageName: string
  price: number
}

export default function PaymentDialog(props: PaymentDialogProps): JSX.Element {
  const { open, onClose, packageId, packageName, price } = props
  const [email, setEmail] = useState<string>('')
  const [telNo, setTelNo] = useState<string>('')
  const useStyles = makeStyles({
    hideObject: {
      display: 'none',
    },
    center: {
      paddingBottom: '25px',
      textAlign: 'center',
      background: 'none',
    },
    buttonHeight: {
      height: '100px;',
    },
    padding: {
      paddingBottom: '50px',
    },
    textWhite: {
      color: 'white',
    },
    dialog: {
      backgroundColor: 'white',
    },
    card: {
      backgroundColor: 'white',
    },
    cardItem: {
      color: 'white',
      marginTop: '10px',
      marginBottom: '10px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '15px',
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
  const submitPayment = () => {
    const createPaymentRequest = {
      packageId,
      userEmail: email,
      userTelNo: telNo,
      paymentType: 'EXTEND',
    } as CreatePaymentRequest
    toast.promise(createPayment(createPaymentRequest), {
      loading: 'กำลังทำรายการ',
      success: (response: CreatePaymentResponse) => {
        window.open(response.paymentUrl, "_self")
        return 'ทำรายการสำเร็จ'
      },
      error: () => {
        return 'ทำรายการไม่สำเร็จ'},
    })
  }

  return (
    <Dialog open={open} fullWidth maxWidth="xs" aria-labelledby="form-dialog-title">
      <div style={{ textAlign: 'center', backgroundColor: 'white' }}>
        <img
          src="./images/button_close.png"
          onClick={() => {
            onClose()
          }}
          style={{
            cursor: 'pointer',
            float: 'right',
            width: '45px',
          }}
        />
      </div>
      <DialogContent className={classes.dialog}>
        <br />
        <Grid container spacing={1}>
          <GridTextField item xs={12} sm={12}>
            <TextField
              type="text"
              id="packageName"
              name="packageName"
              label="ชื่อ Package"
              value={packageName}
              fullWidth
              disabled
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </GridTextField>
          <GridTextField item xs={12} sm={12}>
            <TextField
              type="text"
              id="packagePrice"
              name="packagePrice"
              label="จำนวนเงิน"
              value={price}
              fullWidth
              disabled
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </GridTextField>
          <GridTextField item xs={12} sm={12}>
            <TextField
              type="text"
              id="userEmail"
              name="userEmail"
              label="Email ของลูกค้า"
              fullWidth
              variant="outlined"
              value={email}
              InputLabelProps={{ shrink: true }}
              onChange={({ target }) => {
                setEmail(target.value)
              }}
            />
          </GridTextField>
          <GridTextField item xs={12} sm={12}>
            <TextField
              type="text"
              id="userTelNo"
              name="userTelNo"
              label="เบอร์โทรศัพท์"
              fullWidth
              variant="outlined"
              value={telNo}
              InputLabelProps={{ shrink: true }}
              onChange={({ target }) => {
                setTelNo(target.value)
              }}
            />
          </GridTextField>
          <GridTextField item xs={12} sm={12}>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={() => submitPayment()}
            >
              ชำระเงิน
            </Button>
          </GridTextField>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
