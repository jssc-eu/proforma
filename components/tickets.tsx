import { useEffect, useState, useContext } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

import { ProformaContext } from 'lib/ui/context';

const TicketsForm = ({
  tickets,
  value,
  onChange,
  discount,
  setDiscount,
  quantity,
  setQuantity,
  onAdd,
}) => {
  const loading = (tickets.length === 0);
  return (
    <Card>
      <CardContent sx={{
        display: 'grid',
        gridTemplateColumns: '4fr 1fr',
        gridGap: '1rem',
      }}>
        <FormControl disabled={ loading }>
          <InputLabel id="ticket-label">Ticket</InputLabel>
          <Select
            labelId="ticket-label"
            id="ticket"
            label="Ticket"
            value={ value?.title ?? '' }
            defaultValue={ value?.title ?? '' }
            onChange={ onChange }
          >
          { tickets.map(ticket => (
            <MenuItem
              key={ ticket.title }
              value={ ticket.title }>
                { ticket.title } <em>(€{ ticket.price - (ticket.price * discount / 100) })</em>
            </MenuItem>
          )) }
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            id="quantity"
            label="Quantity"
            variant="outlined"
            type="number"
            value={ quantity }
            onChange={ setQuantity }
            disabled={ loading }
          />
        </FormControl>
      </CardContent>
      <CardActions sx={{
        padding: '0rem 1rem 1rem 1rem',
        justifyContent: 'space-between',
      }}>
        <FormControl>
          <TextField
            id="discount"
            label="Discount %"
            variant="outlined"
            size="small"
            type="number"
            value={ discount }
            onChange={ setDiscount }
            disabled={ loading }
          />
        </FormControl>

          <Button
            variant="contained"
            onClick={ onAdd }
            disabled={ loading }>
              { loading && (
                <>
                  <CircularProgress
                    color="inherit"
                    size={18}
                    sx={{
                      marginRight: '1rem',
                    }}/>
                  Loading
                </>
              ) }
              { !loading && (
                <>
                  Add
                </>
              ) }
          </Button>
      </CardActions>
    </Card>
  );
};
export default function Tickets () {
  const context = useContext(ProformaContext);

  const [selected, setSelected] = useState({
    title: '',
    price: '',
  });
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setSelected(context.tickets[0]);
    setQuantity(1);
  }, [context.tickets]);

  const onTicketSelect = (event) => {
    const value = event.target.value;
    const ticket = context.tickets.find(t => t.title === value);
    setSelected(ticket);
  };

  const onDiscountChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 100) {
      context.setDiscount(value);
    }
  };

  const onQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0) {
      setQuantity(value);
    }
  };

  const onAdd = () => {
    const lineItem = {
      event: context.event,
      id: (Math.random() * 1000).toString(32),
      title: selected.title,
      quantity,
      itemPrice: selected.price,
      discount: context.discount,
    };
    context.setLineItems([...context.lineItems, lineItem]);
  };

  return (
    <>
        <TicketsForm
          discount={ context.discount }
          quantity={ quantity }
          tickets={ context.tickets }
          value={ selected ?? context.tickets[0] ?? {} }
          setDiscount={ onDiscountChange }
          setQuantity={ onQuantityChange }
          onChange={ onTicketSelect }
          onAdd={ onAdd }
        />
    </>
  );
}
