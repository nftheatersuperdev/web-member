import { Stars } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
        <TableRow key={r.id}>
          <TableCell>
            <Radio
              checked={selectedReward === r.id}
              onChange={handleChange}
              value={r.id}
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
          </TableCell>
          <TableCell>{r.rewardName}</TableCell>
          <TableCell align="center">
            {r.redeemPoint}
            <IconButton disabled>
              <Stars sx={{ fontSize: 14, color: 'red' }} />
            </IconButton>
          </TableCell>
        </TableRow>
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
      <DialogTitle id="form-dialog-title">แลกของรางวัล</DialogTitle>
      <form onSubmit={formikRedeem.handleSubmit}>
        <DialogContent>
          <TableContainer component={Paper} className={classes.center}>
            <Table sx={{ minWidth: 150 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">เลือก</TableCell>
                  <TableCell align="center">รางวัล</TableCell>
                  <TableCell align="center">แลกคะแนน</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{reward}</TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </form>
    </Dialog>
  )
}
