import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { getRewardList, redeemReward } from 'services/member'

interface RewardListDialogProps {
  open: boolean
  onClose: () => void
}

export default function RewardListDialog(props: RewardListDialogProps): JSX.Element {
  const { open, onClose } = props
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
    dialog: {
      backgroundColor: 'black',
    },
    dialogHeader: {
      backgroundColor: 'black',
      color: 'white',
    },
    card: {
      backgroundColor: 'black',
    },
    cardItem: {
      color: 'white',
      marginTop: '10px',
      marginBottom: '10px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '15px',
    },
    redeemBtn: {
      width: '110px',
      fontFamily: 'Prompt',
      fontSize: '18px',
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
  const [selectedReward, setSelectedReward] = useState<string>('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReward(event.target.value)
    formikRedeem.setFieldValue('rewardId', event.target.value)
  }
  const { data: rewardList, refetch } = useQuery('reward-list', () => getRewardList(), {
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  })
  const reward =
    rewardList &&
    rewardList.length > 0 &&
    rewardList.map((r) => {
      return (
        // <TableRow key={r.id}>
        //   <TableCell>
        //     <Radio
        //       checked={selectedReward === r.id}
        //       onChange={handleChange}
        //       value={r.id}
        //       name="radio-buttons"
        //       inputProps={{ 'aria-label': 'A' }}
        //     />
        //   </TableCell>
        //   <TableCell>{r.rewardName}</TableCell>
        //   <TableCell align="center">
        //     {r.redeemPoint}
        //     <IconButton disabled>
        //       <Stars sx={{ fontSize: 14, color: 'red' }} />
        //     </IconButton>
        //   </TableCell>
        // </TableRow>
        <Card key={r.id} className={classes.card}>
          <CardActionArea className={classes.cardItem}>
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 300 }}>
              <CardContent sx={{ minWidth: 260 }}>
                <Typography component="div" variant="h5">
                  {r.rewardName}
                </Typography>
                <br />
                <Button
                  className={classes.redeemBtn}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  id="redeem_btn"
                >
                  แลกแต้ม
                </Button>
              </CardContent>
              <CardContent sx={{ maxWidth: 340 }}>
                <img src="./images/redeem_point_icon.png" style={{ width: '110px' }}/>
              </CardContent>
            </Box>
          </CardActionArea>
        </Card>
      )
    })
  const formikRedeem = useFormik({
    initialValues: {
      rewardId: '',
    },
    validationSchema: Yup.object().shape({
      rewardId: Yup.string().required('กรุณาแลกรางวัลที่ต้องการแลก'),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      toast.promise(redeemReward(values.rewardId), {
        loading: 'กำลังดำเนินการ',
        success: () => {
          formikRedeem.resetForm()
          setSelectedReward('')
          // onClose()
          onClose()
          return 'แลกของรางวัลสำเร็จ'
        },
        error: (err) => {
          formikRedeem.resetForm()
          setSelectedReward('')
          return 'แลกของรางวัลไม่สำเร็จ เนื่องจาก ' + err.data.message
        },
      })
    },
  })
  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <Dialog open={open} fullWidth maxWidth="xs" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.dialogHeader}>
        รายการแลกของรางวัล
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
      </DialogTitle>
      <form onSubmit={formikRedeem.handleSubmit}>
        <DialogContent className={classes.dialog}>{reward}</DialogContent>
        {/* <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              formikRedeem.resetForm()
              setSelectedReward('')
              onClose()
            }}
            variant="contained"
            id="close_reward_btn"
          >
            ปิด
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={!formikRedeem.dirty}
            variant="contained"
            id="redeem_reward_btn"
          >
            แลกรางวัล
          </Button>
        </DialogActions> */}
      </form>
    </Dialog>
  )
}
