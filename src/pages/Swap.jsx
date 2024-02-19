import { SnackbarProvider } from "notistack";

import Web3Provider from "../network";
import CoinSwapper from '../CoinSwapper/CoinSwapper';

const Swap = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Web3Provider render={(network) => (
        <CoinSwapper network={network} />
      )}>
      </Web3Provider>
    </SnackbarProvider>
  )
}

export default Swap
