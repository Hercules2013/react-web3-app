import { useCallback } from 'react';
import { Button } from '@mui/material';
import { connectors, getConnectorName, Web3Connector } from './connectors';
import styles from '../styles/connectors.module.css';

function Connector({ web3Connector }: { web3Connector: Web3Connector }) {
  const [connector, hooks] = web3Connector
  const isActive = hooks.useIsActive()
  const onClick = useCallback(() => {
    if (isActive) {
      connector.deactivate()
    } else {
      connectors.forEach(([connector]) => connector.deactivate())
      connector.activate()
    }
  }, [connector, isActive])

  return (
    <div className={styles.connector}>
      <label>{getConnectorName(connector)}</label>
      <Button onClick={onClick}>{isActive ? 'Disconnect' : 'Connect'}</Button>
      <svg className={[styles.status, isActive && styles.active].join(' ')} viewBox="0 0 2 2">
        <circle cx={1} cy={1} r={1} />
      </svg>
    </div>
  )
}

export default function Connectors() {
  return (
    <div className={styles.connectors}>
      {connectors.map((web3Connector, index) => (
        <Connector key={index} web3Connector={web3Connector} />
      ))}
    </div>
  )
}
