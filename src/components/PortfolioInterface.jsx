import { useState } from 'react'
import { Button, Table } from 'antd'
import { useQuery, gql } from '@apollo/client'
import moment from 'moment' // Import moment

// Define a GraphQL query
const GET_TRANSACTIONS = gql`
  query MyQuery {
    swaps(first: 10, orderBy: id, orderDirection: asc, skip: 10, subgraphError: allow) {
      amount0
      amount1
      amountUSD
      id
      logIndex
      origin
      timestamp
      recipient
    }
  }
`

const PortfolioInterface = ({ provider }) => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS)

  if (error) return <p>Error: {error.message}</p>

  const columns = [
    // { title: 'Type', dataIndex: '__typename', key: 'type' },
    { title: 'From', dataIndex: 'origin', key: 'from', width: '30px' },
    { title: 'To', dataIndex: 'recipient', key: 'to', width: '30px' },
    {
      title: 'Value',
      dataIndex: 'amountUSD',
      key: 'value',
      render: (value) => formatValue(parseFloat(value)),
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'time',
      render: (timestamp) => moment.unix(timestamp).fromNow(),
    },
  ]

  // Utility function to format values over 1000 as "1K", etc.
  const formatValue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K USD`; // Adjust the precision as needed
    }
    return value.toFixed(2) + "USD";
  };

  // const onClick = async () => {
  //   console.log(data)
  // }

  return (
    <>
      {/* <Button onClick={onClick}>Click me!</Button> */}
      <Table columns={columns} dataSource={data ? data.swaps : []} loading={loading} />
    </>
  )
}

export default PortfolioInterface
