/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import {
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  Button,
  styled,
  DialogTitle,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const CustomerDialog = styled(Dialog)`
  .MuiPaper-root { 
    border-radius: 25px;
    border: 2px solid black;
    background: linear-gradient(212.22deg, #FF0000 1.6%, #3A0000 100%);
    linear-gradient(180deg, rgba(255, 254, 254, 0) 8.33%, rgba(255, 0, 0, 0.25) 100%);
  }
`
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

interface RewardDialogProps {
  open: boolean
  onClose: () => void
  onOpenRewardList: () => void
}

export default function RewardDialog(props: RewardDialogProps): JSX.Element {
  const { open, onClose, onOpenRewardList } = props
  const useStyles = makeStyles({
    hideObject: {
      display: 'none',
    },
    center: {
      paddingBottom: '25px',
      textAlign: 'center',
    },
    buttonHeight: {
      height: '100px;',
    },
    padding: {
      paddingBottom: '50px',
    },
  })
  const classes = useStyles()
  return (
    <CustomerDialog open={open} fullWidth maxWidth="xs" aria-labelledby="form-dialog-title">
      <div style={{ textAlign: 'center' }}>
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
            <a href="https://lin.ee/AmPbEF2" target="blank">
              <img style={{ width: '100%' }} src="./images/event_theater.png" />
            </a>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.center}>
            <img
              style={{ width: '100%' }}
              src="./images/random.png"
              onClick={() => onOpenRewardList()}
            />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.center}>
            <img
              style={{ width: '100%' }}
              src="./images/redeem_reward.png"
              onClick={() => onOpenRewardList()}
            />
          </Grid>
        </Grid>
      </DialogContent>
      {/* <DialogActions>
        <Button color="primary" onClick={onClose} variant="contained" id="close_reward_btn">
          ปิด
        </Button>
      </DialogActions> */}
    </CustomerDialog>
  )
}
