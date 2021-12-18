import { useEffect, useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import { ProformaContext } from 'lib/ui/context'

export default function LineItems({ removeLine }) {
  const context = useContext(ProformaContext);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }} >
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{ width: '10%' }} align="right">Quantity</TableCell>
            <TableCell sx={{ width: '15%' }} align="right">Item price</TableCell>
            <TableCell sx={{ width: '15%' }} align="right">Sum</TableCell>
            <TableCell sx={{ width: '10%' }} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {context.lineItems.map((row) => {
            const price = row.itemPrice - (row.itemPrice * row.discount / 100)

            let discountInfo = ''
            if (row.discount > 0) {
              discountInfo=`(with ${row.discount}% discount)`
            }

            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontSize: 16, paddingLeft: 1 }} color="text.secondary" gutterBottom>
                    {row.ticket} {discountInfo}
                  </Typography>
                  <Typography sx={{ fontSize: 12, paddingLeft: 1 }} color="text.secondary" gutterBottom>
                    {row.event.title}
                  </Typography>
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">€{price}</TableCell>
                <TableCell align="right">€{price * row.amount}</TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    onClick={ () => removeLine(row.id) }
                    sx={{ color: red[900], cursor: 'pointer' }}
                  />
                </TableCell>
              </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
