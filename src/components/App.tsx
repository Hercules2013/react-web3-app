import { useRef, useCallback } from 'react';
import { SwapOutlined, LineChartOutlined } from '@ant-design/icons';

import { Tabs, Card } from 'antd';
import SwapInterface from './SwapInterface';
import PortfolioInterface from './PortfolioInterface';

import { useActiveProvider } from '../connectors'

import '@uniswap/widgets/fonts.css'

import Web3Connectors from './Web3Connectors'
import styles from '../styles/Home.module.css'

export default function App() {
  // When a user clicks "Connect your wallet" in the SwapWidget, this callback focuses the connectors.
  const connectors = useRef<HTMLDivElement>(null)
  const focusConnectors = useCallback(() => connectors.current?.focus(), [])

  // The provider to pass to the SwapWidget.
  // This is a Web3Provider (from @ethersproject) supplied by @web3-react; see ./connectors.ts.
  const provider = useActiveProvider()
  
  const pages = [
    { icon: SwapOutlined, label: "Swap", component: <SwapInterface provider={provider} focusConnectors={focusConnectors} /> },
    { icon: LineChartOutlined, label: "Portfolio", component: <PortfolioInterface provider={provider} /> }
  ];

  return (
    <div className={styles.container}>
      {/* <div className={styles.i18n}>
        <label style={{ display: 'flex' }}>
          <FiGlobe />
        </label>
        <select onChange={onSelectLocale}>
          {SUPPORTED_LOCALES.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </div> */}

      <main className={styles.main}>
        <div className={styles.demo}>
          <div className={styles.connectors} ref={connectors} tabIndex={-1}>
            <Web3Connectors />
          </div>

          <Card 
            // title="Project" 
            bordered={true} 
            // extra={<Button type='primary' onClick={() => open()}>Connect Wallet</Button>}
            // style={{ width: 800, height: 468 }}
          >
            <Tabs
              defaultActiveKey="2"
              items={pages.map((page, i) => {
                const Icon = page.icon;
                return {
                  key: String(i + 1),
                  label: page.label,
                  children: page.component,
                  icon: <Icon rev="twoToneColor"  />
                }
              })}
            />
          </Card>
        </div>
      </main>
    </div>
  )
}
