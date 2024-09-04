/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/alt-text */
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
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { getNetflixPackage } from 'services/member'

interface NetflixPackageDialogProps {
  open: boolean
  onClose: () => void
  onOpenPayment: (id: string, name: string, price: number) => void
}

export default function NetflixPackageDialog(props: NetflixPackageDialogProps): JSX.Element {
  const { open, onClose, onOpenPayment } = props

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
  const { data: packageList, refetch } = useQuery('netflix-package', () => getNetflixPackage(), {
    refetchOnWindowFocus: false,
  })

  const packages =
    packageList &&
    packageList.length > 0 &&
    packageList.map((p) => {
      return (
        <Card
          key={p.packageId}
          className={classes.card}
          style={{ paddingTop: '10px' }}
          onClick={() => {
            onOpenPayment(p.packageId, p.packageName, p.packagePrice)
          }}
        >
          <CardActionArea className={classes.cardItem}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" style={{ color: 'dimgray' }} component="div">
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
