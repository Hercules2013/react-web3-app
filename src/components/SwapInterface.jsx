import { SwapWidget } from '@uniswap/widgets'

import { JSON_RPC_URL } from '../constants'

import styles from '../styles/Home.module.css'

const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

const SwapInterface = ({provider, focusConnectors}) => {
  return (
    <div className={styles.widget}>
      <SwapWidget
        jsonRpcEndpoint={JSON_RPC_URL}
        tokenList={TOKEN_LIST}
        provider={provider}
        // locale={locale}
        onConnectWallet={focusConnectors}
        defaultInputTokenAddress="NATIVE"
        defaultInputAmount="1"
        defaultOutputTokenAddress={UNI}
      />
    </div>
  )
}

export default SwapInterface
