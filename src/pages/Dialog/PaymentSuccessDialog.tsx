import { Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material'
import styled from 'styled-components'
import { makeStyles } from '@mui/styles'
import { TaskAlt } from '@mui/icons-material'

const CustomerDialog = styled(Dialog)`
  .MuiPaper-root { 
    border-radius: 25px;
    border: 2px solid red;
    background: linear-gradient(212.22deg, #FF0000 1.6%, #3A0000 100%);
    linear-gradient(180deg, rgba(255, 254, 254, 0) 8.33%, rgba(255, 0, 0, 0.25) 100%);
  }
`
interface PaymentSuccessDialogProps {
  open: boolean
  onClose: () => void
}

export default function PaymentSuccessDialog(props: PaymentSuccessDialogProps): JSX.Element {
  const { open, onClose } = props
  const useStyles = makeStyles({
    hideObject: {
      display: 'none',
    },
    center: {
      textAlign: 'center',
    },
    yellowBtn: {
      fontFamily: 'Prompt',
      fontSize: '20px',
      borderRadius: '38px',
      background: 'linear-gradient(185.98deg, #FFA928 3.55%, #922D01 100%)',
      color: '#ffffff',
      position: 'fixed',
      // right: '38.5%',
      '&:hover': {
        backgroundColor: '#D1322F',
        opacity: [0.9, 0.8, 0.7],
      },
    },
  })
  const classes = useStyles()
  return (
    <CustomerDialog open={open} fullWidth aria-labelledby="form-dialog-title">
      <div style={{ textAlign: 'center', backgroundColor: 'transparent' }}>
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
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} className={classes.center}>
            <Typography component="h1" variant="h4" align="center" style={{ color: 'white' }}>
              ชำระเงินสำเร็จ
            </Typography>
            <Typography component="h1" variant="h6" align="center" style={{ color: 'white' }}>
              ระบบได้ทำการสมัคร/ต่ออายุแพ็คเก็จของคุณเรียบร้อยแล้ว
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.center}>
            <Button>
              <TaskAlt style={{ color: '#19ff19', fontSize: '150px' }} />
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
          style={{ justifyContent: 'center' }}>
        <Button
          className={classes.yellowBtn}
          type="submit"
          variant="contained"
          id="redeem_btn"
          onClick={() => onClose()}
        >
            ตกลง
        </Button>
      </DialogActions>
    </CustomerDialog>
  )
}
