import { useRef, useCallback } from 'react'
import { SwapWidget } from '@uniswap/widgets'

import Web3Connectors from '../components/Web3Connectors'
import { useActiveProvider } from '../components/connectors'

import { JSON_RPC_URL, TOKEN_LIST, UNI } from '../utils/constants';

import styles from '../styles/Swap.module.css'

const Swap = () => {
  // The provider to pass to the SwapWidget.
  // This is a Web3Provider (from @ethersproject) supplied by @web3-react; see ./connectors.ts.
  const provider = useActiveProvider()

  return (
    <div className={styles.swapPage}>
      <Web3Connectors />
      <SwapWidget
        jsonRpcEndpoint={JSON_RPC_URL}
        tokenList={TOKEN_LIST}
        provider={provider}
        defaultInputTokenAddress="NATIVE"
        defaultInputAmount="1"
        defaultOutputTokenAddress={UNI}
      />
    </div>
  )
}

export default Swap
