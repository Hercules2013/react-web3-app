import * as React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, CircularProgress } from '@mui/material';
import { useMediaQuery } from '@mui/material';
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
      id
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
  
  // Define breakpoints for responsive behavior
  const match1 = useMediaQuery('(min-width:860px)');
  const match2 = useMediaQuery('(min-width:815px)');
  const match3 = useMediaQuery('(min-width:730px)');
  const match4 = useMediaQuery('(min-width:640px)');

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </div>
    );
  }

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
        <Table aria-label="transaction table">
          <TableHead>
            <TableRow>
              <TableCell>Swaps</TableCell>
              {match1 && <TableCell align="right">Total Value</TableCell>}
              {match2 && <TableCell align="right">Token Amount</TableCell>}
              {match3 && <TableCell align="right">Token Amount</TableCell>}
              {match4 && <TableCell align="right">Account</TableCell>}
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data ? data.swaps : []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => (
              <TableRow 
                key={record.id} 
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => window.open(`https://etherscan.io/tx/${record.id.split('#')[0]}`)}
              >
                <TableCell component="th" scope="row">
                  {`Swap ${record.token1.symbol} for ${record.token0.symbol}`}
                </TableCell>
                {match1 && <TableCell align="right">{"$" + formatValue(parseFloat(record.amountUSD))}</TableCell>}
                {match2 && <TableCell align="right">{formatValue(parseFloat(record.amount0)) + " " + record.token0.symbol}</TableCell>}
                {match3 && <TableCell align="right">{formatValue(parseFloat(record.amount1)) + " " + record.token1.symbol}</TableCell>}
                {match4 && <TableCell align="right">{record.origin}</TableCell>}
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