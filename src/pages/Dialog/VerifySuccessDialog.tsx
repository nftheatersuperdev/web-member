import {
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Stars } from '@mui/icons-material'

interface VerifySuccessDialogProps {
  open: boolean
  onClose: () => void
}

export default function VerifySuccessDialog(props: VerifySuccessDialogProps): JSX.Element {
  const { open, onClose } = props
  const useStyles = makeStyles({
    hideObject: {
      display: 'none',
    },
    center: {
      textAlign: 'center',
    },
  })
  const classes = useStyles()
  return (
    <Dialog open={open} fullWidth maxWidth="xs" aria-labelledby="form-dialog-title">
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} className={classes.center}>
            <Typography component="h1" variant="h4" align="center">
              ขอแสดงความยินดี
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.center}>
            <IconButton disabled>
              <Stars sx={{ fontSize: 80, color: 'red' }} />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.center}>
            <Typography component="h1" variant="h5" align="center">
              คุณได้รับคะแนนสะสม 1 แต้ม
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose} variant="contained" id="close_verify_success_btn">
          ตกลง
        </Button>
      </DialogActions>
    </Dialog>
  )
}
