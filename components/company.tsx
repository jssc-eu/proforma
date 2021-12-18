import { useEffect, useState, useContext } from 'react'

import { getNames } from 'country-list'

import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { ProformaContext } from 'lib/ui/context'

export default function Company () {

  const context = useContext(ProformaContext);

  const update = (field, value) => {
    const company = Object.assign({}, context.company, {
      [field]: value
    })
    context.setCompany(company)
  }

  return (
    <>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField
          id="company-name"
          label="Company Name"
          variant="outlined"
          onChange={ (e) => (update('name', e.target.value)) }
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField
          id="vat-number"
          label="VAT Number"
          variant="outlined"
          onChange={ (e) => (update('vat', e.target.value)) }
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField id="city" label="City" variant="outlined"
        onChange={ (e) => (update('city', e.target.value)) } />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField
          id="address"
          label="Address"
          variant="outlined" multiline
          rows={4}
          onChange={ (e) => (update('address', e.target.value)) }
          />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField id="postal-code" label="Postal Code" variant="outlined"
        onChange={ (e) => (update('postalcode', e.target.value)) } />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="country">Country</InputLabel>
        <Select
          labelId="country-label"
          id="country"
          label="Country"
          value={ context.company.country || "" }
          defaultValue={ context.company.country || "" }
          onChange={ (e) => (update('country', e.target.value)) }
        >
          { getNames().map((name) => (
            <MenuItem
            key={name}
            value={name}>
              {name}
          </MenuItem>
          )) }
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          onChange={ (e) => (update('email', e.target.value)) }
        />
      </FormControl>
    </>
  )
}
