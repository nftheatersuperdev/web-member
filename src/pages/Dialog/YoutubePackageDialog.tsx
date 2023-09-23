import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { getYoutubePackage } from 'services/member'

interface YoutubePackageDialogProps {
  open: boolean
  onClose: () => void
}

export default function YoutubePackageDialogDialog(props: YoutubePackageDialogProps): JSX.Element {
  const { open, onClose } = props
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
    dialogHeader: {
      backgroundImage: 'url(/youtube-package-header.jpg)',
      backgroundSize: 'cover',
      height: '100px',
    },
    dialog: {
      backgroundColor: 'black',
    },
  })
  const classes = useStyles()
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPackage(event.target.value)
    //   formikRedeem.setFieldValue('rewardId', event.target.value)
  }
  const { data: packageList, refetch } = useQuery('youtube-package', () => getYoutubePackage(), {
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  })

  const packages =
    packageList &&
    packageList.length > 0 &&
    packageList.map((p) => {
      return (
        <TableRow key={p.packageId}>
          <TableCell>
            <Radio
              sx={{
                color: 'white',
              }}
              checked={selectedPackage === p.packageId}
              onChange={handleChange}
              value={p.packageId}
              name="radio-buttons"
            />
          </TableCell>
          <TableCell className={classes.textWhite}>{p.packageName}</TableCell>
          <TableCell className={classes.textWhite} align="center">
            {p.packagePrice} บาท
          </TableCell>
        </TableRow>
      )
    })
  // const formikRedeem = useFormik({
  //   initialValues: {
  //     rewardId: '',
  //   },
  //   validationSchema: Yup.object().shape({
  //     rewardId: Yup.string().required('กรุณาแลกรางวัลที่ต้องการแลก'),
  //   }),
  //   enableReinitialize: true,
  //   onSubmit: (values) => {
  //     toast.promise(redeemReward(values.rewardId), {
  //       loading: 'กำลังดำเนินการ',
  //       success: () => {
  //         formikRedeem.resetForm()
  //         setSelectedReward('')
  //         // onClose()
  //         onClose()
  //         return 'แลกของรางวัลสำเร็จ'
  //       },
  //       error: (err) => {
  //         formikRedeem.resetForm()
  //         setSelectedReward('')
  //         return 'แลกของรางวัลไม่สำเร็จ เนื่องจาก ' + err.data.message
  //       },
  //     })
  //   },
  // })
  useEffect(() => {
    refetch()
  }, [refetch])
  return (
    <Dialog open={open} fullWidth maxWidth="xs" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className={classes.dialogHeader} />
      {/* <form onSubmit={formikRedeem.handleSubmit}> */}
      <form>
        <DialogContent className={classes.dialog}>
          <TableContainer component={Paper} className={classes.center}>
            <Table sx={{ minWidth: 150 }} aria-label="simple table">
              <TableBody>{packages}</TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button
            color="primary"
            onClick={() => {
              // formikRedeem.resetForm()
              // setSelectedReward('')
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
            // disabled={!formikRedeem.dirty}
            variant="contained"
            id="redeem_reward_btn"
          >
            ตกลง
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
