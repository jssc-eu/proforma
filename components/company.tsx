import { useContext } from 'react';

import { getNames, getCode } from 'country-list';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ProformaContext } from 'lib/ui/context';

export default function Company ({ data }) {
  const context = useContext(ProformaContext);
  const update = (field:string, value:any) => {
    const fields = {
      [field]: value,
    };

    if (field === 'country') {
      fields.countryCode = getCode(value);
    }

    const company = { ...data, ...fields };
    context.setCompany(company);
  };

  return (
    <>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <TextField
            id="due-days"
            label="Payment Due in Days"
            variant="outlined"
            type="number"
            value={data.dueDays}
            onChange={ e => (update('dueDays', e.target.value)) }
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <TextField
            id="company-name"
            label="Company Name"
            variant="outlined"
            value={data.companyName}
            onChange={ e => (update('companyName', e.target.value)) }
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <TextField
            id="vat-number"
            label="VAT Number"
            variant="outlined"
            value={data.taxNumber}
            onChange={ e => (update('taxNumber', e.target.value)) }
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <TextField
            id="city"
            label="City"
            variant="outlined"
            value={data.city}
            onChange={ e => (update('city', e.target.value)) }
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <TextField
            id="address"
            label="Address"
            variant="outlined" multiline
            rows={4}
            value={data.address}
            onChange={ e => (update('address', e.target.value)) }
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <TextField
            id="state"
            label="State / Province"
            variant="outlined"
            value={data.state}
            onChange={ e => (update('state', e.target.value)) }
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <TextField
            id="postal-code"
            label="Postal Code"
            variant="outlined"
            value={data.zip}
            onChange={ e => (update('zip', e.target.value)) }
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel id="country">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            label="Country"
            value={ data.country || '' }
            defaultValue={ data.country || '' }
            onChange={ e => (update('country', e.target.value)) }
          >
            { getNames().map(name => (
              <MenuItem
              key={name}
              value={name}>
                {name}
            </MenuItem>
            )) }
          </Select>
        </FormControl>
        </>
  );
}
