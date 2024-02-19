import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';

const GET_TRANSACTIONS = gql`
  query MyQuery {
    swaps(orderBy: timestamp, orderDirection: desc, subgraphError: allow) {
      amount0
      amount1
      amountUSD
      origin
      timestamp
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
  }
`;

const PortfolioInterface = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) return <p>Error: {error.message}</p>;

  const formatValue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toFixed(2);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="transaction table">
          <TableHead>
            <TableRow>
              <TableCell>Swaps</TableCell>
              <TableCell align="right">Total Value</TableCell>
              <TableCell align="right">Token Amount</TableCell>
              <TableCell align="right">Token Amount</TableCell>
              <TableCell align="right">Account</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data ? data.swaps : []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => (
              <TableRow key={record.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {`Swap ${record.token1.symbol} for ${record.token0.symbol}`}
                </TableCell>
                <TableCell align="right">{"$" + formatValue(parseFloat(record.amountUSD))}</TableCell>
                <TableCell align="right">{formatValue(parseFloat(record.amount0)) + " " + record.token0.symbol}</TableCell>
                <TableCell align="right">{formatValue(parseFloat(record.amount0)) + " " + record.token1.symbol}</TableCell>
                <TableCell align="right">{record.origin}</TableCell>
                <TableCell align="right">{moment.unix(record.timestamp).fromNow()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data ? data.swaps.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default PortfolioInterface;
