import { useEffect, useState, useContext } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import { ProformaContext } from 'lib/ui/context'


const TicketsForm = ({ tickets, value, onChange }) => {
  return (
    <Card>
      <CardContent sx={{
        display: 'grid',
        gridTemplateColumns: '4fr 1fr',
        gridGap: '1rem'
      }}>
        <FormControl disabled={ tickets.length === 0 }>
          <InputLabel id="ticket-label">Ticket</InputLabel>
          <Select
            labelId="ticket-label"
            id="ticket"
            label="Ticket"
            value={ value }
            defaultValue={ value }
            onChange={ onChange }
          >
          { tickets.map(ticket => (
            <MenuItem
              key={ticket.title}
              value={ticket}>
                {ticket.title} <em>(€{ticket.price})</em>
            </MenuItem>
          )) }
          </Select>
        </FormControl>
        <FormControl disabled={ tickets.length === 0 }>
          <TextField id="amount" label="Amount" variant="outlined" />
        </FormControl>
      </CardContent>
      <CardActions sx={{
        padding: '0rem 1rem 1rem 1rem'
      }}>
        <Button variant="contained" size="small" disabled={ tickets.length === 0 }>
          {tickets.length === 0 && "Loading" }
          {tickets.length > 0 && "Add" }
        </Button>
      </CardActions>
    </Card>
  )
}
export default function Tickets () {
  const context = useContext(ProformaContext);

  const [ selected, setSelected ] = useState()

  return (
    <>
        <TicketsForm
          tickets={ context.tickets }
          value={ selected ?? context.tickets[0] ?? {} }
          onChange={ (event) => setSelected(event.target.value) }

        />
    </>
  )
}
