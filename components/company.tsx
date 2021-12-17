
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'

export default function Company () {
  return (
    <>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField id="company-name" label="Company Name" variant="outlined" />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField id="vat-number" label="VAT Number" variant="outlined" />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField id="city" label="City" variant="outlined" />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField
          id="address"
          label="Address"
          variant="outlined" multiline
          rows={4} />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField id="postal-code" label="Postal Code" variant="outlined" />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="country">Country</InputLabel>
        <Select
          labelId="country-label"
          id="country"
          label="Country"
        >
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField id="email" label="Email" variant="outlined" />
      </FormControl>
    </>
  )
}
