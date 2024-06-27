import {
  Box,
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
import { getNetflixPackage } from 'services/member'

interface NetflixPackageDialogProps {
  open: boolean
  onClose: () => void
}

export default function NetflixPackageDialog(props: NetflixPackageDialogProps): JSX.Element {
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
      backgroundImage: 'url(/netflix-package-header.png)',
      backgroundSize: 'contain',
      height: '215px',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'black',
    },
    dialog: {
      backgroundColor: 'black',
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
  })
  const classes = useStyles()
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPackage(event.target.value)
    //   formikRedeem.setFieldValue('rewardId', event.target.value)
  }
  const { data: packageList, refetch } = useQuery('netflix-package', () => getNetflixPackage(), {
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  })

  const packages =
    packageList &&
    packageList.length > 0 &&
    packageList.map((p) => {
      return (
        <Card key={p.packageId} className={classes.card}>
          <CardActionArea className={classes.cardItem}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" style={{ color: 'dimgray' }}component="div">
                  แพ็คเกจสำหรับ
                </Typography>
                <Typography component="div" variant="h5">
                  {p.packageName}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ color: 'red', fontStyle: 'bold' }}
                >
                  ฿{p.packagePrice}
                </Typography>
              </CardContent>
            </Box>
          </CardActionArea>
        </Card>
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
      <div style={{ textAlign: 'center', backgroundColor: 'black' }}>
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
      <DialogTitle id="form-dialog-title" className={classes.dialogHeader} />
      {/* <form onSubmit={formikRedeem.handleSubmit}> */}
      <form>
        <DialogContent className={classes.dialog}>
          <h2 style={{ textAlign: 'center', color: 'white' }}>
            แพ็คเกจสำหรับ <p style={{ color: 'red' }}>Netflix</p>
          </h2>
          {packages}
        </DialogContent>
      </form>
    </Dialog>
  )
}
