import { useEffect, useState, useContext } from 'react';
import { roundTo } from 'round-to';
import discountPrice from 'lib/lineitem/discount-price';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { ProformaContext } from 'lib/ui/context';

export default function Sum ({ send, lineItems, company }) {
  const context = useContext(ProformaContext);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      lineItems.length > 0
      && company.companyName
      && company.taxNumber
      && company.city
      && company.address
      && company.zip
      && company.countryCode
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [context.lineItems, context.company]);

  const total = context.lineItems.reduce((sum, item) => {
    const {
      quantity,
      itemPrice,
      discount,
    } = item;
    return sum + (quantity * discountPrice(itemPrice, discount));
  }, 0);

  return (<TableContainer component={Paper} sx={{ marginTop: 2 }} >
    <Table aria-label="simple table">
    <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{ width: '10%' }} align="right"></TableCell>
            <TableCell sx={{ width: '15%' }} align="right"></TableCell>
            <TableCell sx={{ width: '15%' }} align="right">Total Price</TableCell>
            <TableCell sx={{ width: '10%' }} align="right"></TableCell>
          </TableRow>
        </TableHead>

      <TableBody>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">
            <strong>€{roundTo(total, 2)}</strong>
          </TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
      <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row" align="right" colSpan={ 5 }>
            <Button
              variant="contained"
              disabled={ disabled }
              onClick={ send }
            >
              Create Pro-forma Invoice
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>);
}

