import { Dialog, DialogContent, Grid, DialogActions, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'

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
    <Dialog open={open} fullWidth maxWidth="xs" aria-labelledby="form-dialog-title">
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} className={classes.center}>
            <Button
              className={classes.buttonHeight}
              color="primary"
              fullWidth
              size="large"
              href="https://lin.ee/AmPbEF2"
              target="blank"
              variant="contained"
              id="event_theater__btn"
            >
              Event Theater แจก 50,000 ทุกสิ้นเดือน
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.center}>
            <Button
              className={classes.buttonHeight}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              id="event_theater__btn"
            >
              วงล้อลุ้นโชค (ฟรี)
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.center}>
            <Button
              className={classes.buttonHeight}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              id="event_theater__btn"
              onClick={onOpenRewardList}
            >
              แลกของรางวัล
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose} variant="contained" id="close_reward_btn">
          ปิด
        </Button>
      </DialogActions>
    </Dialog>
  )
}
