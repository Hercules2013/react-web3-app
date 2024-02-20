import { SwapWidget } from '@uniswap/widgets';
import { useMediaQuery } from '@mui/material';

import Web3Connectors from '../components/Web3Connectors';
import { useActiveProvider } from '../components/connectors';

import { JSON_RPC_URL, TOKEN_LIST, UNI } from '../utils/constants';

import styles from '../styles/swap.module.css';

const Swap = () => {
  // The provider to pass to the SwapWidget.
  // This is a Web3Provider (from @ethersproject) supplied by @web3-react; see ./connectors.ts.
  const provider = useActiveProvider()

  const match1 = useMediaQuery('(min-width:840px)');

  return (
    <div className={styles.swapPage} style={ match1 ? { flexDirection: 'row' } : { flexDirection: 'column' }}>
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
