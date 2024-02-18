import { useState } from 'react'
import { Button, Table } from 'antd'
import { useQuery, gql } from '@apollo/client'
import moment from 'moment'
import coinlist from 'coinlist'

// Define a GraphQL query
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
`

const PortfolioInterface = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS)

  if (error) return <p>Error: {error.message}</p>

  const columns = [
    {
      title: 'Swaps',
      key: 'swap',
      render: (text, record) => `Swap ${record.token1.symbol} for ${record.token0.symbol}`
    },
    {
      title: 'Total Value',
      dataIndex: 'amountUSD',
      key: 'totalValue',
      render: (value) => "$" + formatValue(parseFloat(value)),
    },
    {
      title: 'Token Amount',
      dataIndex: 'amount0',
      key: 'tokenAmount1',
      render: (value, record) => formatValue(parseFloat(value)) + " " + record.token0.symbol,
    },
    {
      title: 'Token Amount',
      dataIndex: 'amount1',
      key: 'tokenAmount2',
      render: (value, record) => formatValue(parseFloat(value)) + " " + record.token1.symbol,
    },
    { title: 'Account', dataIndex: 'origin', key: 'origin', width: '30px' },
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
      return `${(value / 1000).toFixed(2)}K` // Adjust the precision as needed
    }
    return value.toFixed(2)
  }

  return (
    <Table columns={columns} dataSource={data ? data.swaps : []} loading={loading} />
  )
}

export default PortfolioInterface
