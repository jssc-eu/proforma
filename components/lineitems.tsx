import { roundTo } from 'round-to';
import discountPrice from 'lib/lineitem/discount-price';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

export default function LineItems({ lineItems, removeLine }) {
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
          {lineItems.map((row) => {
            const price = discountPrice(row.itemPrice, row.discount);

            let discountInfo = '';
            if (row.discount > 0) {
              discountInfo = `(with ${row.discount}% discount)`;
            }

            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontSize: 16, paddingLeft: 1 }} color="text.secondary" gutterBottom>
                    {row.title} {discountInfo}
                  </Typography>
                  <Typography sx={{ fontSize: 12, paddingLeft: 1 }} color="text.secondary" gutterBottom>
                    {row.event.title}
                  </Typography>
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">€{price}</TableCell>
                <TableCell align="right">€{roundTo(price * row.quantity, 2)}</TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    onClick={ () => removeLine(row.id) }
                    sx={{ color: red[900], cursor: 'pointer' }}
                  />
                </TableCell>
              </TableRow>
          );
})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
