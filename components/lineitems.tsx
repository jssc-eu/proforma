import { useEffect, useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ProformaContext } from 'lib/ui/context'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function LineItems() {
  const context = useContext(ProformaContext);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }} >
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Item price</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {context.lineItems.map((row) => {
            const price = row.itemPrice - (row.itemPrice * row.discount / 100)
            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.ticket}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{price}</TableCell>
                <TableCell align="right">{price * row.amount}</TableCell>
                <TableCell align="right">icons</TableCell>
              </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
