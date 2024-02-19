import { Route, Routes, Link, useLocation } from 'react-router-dom'

import SwapPage from './pages/Swap'
import PortfolioPage from './pages/Portfolio'

import styles from './App.module.css'

import { createTheme, ThemeProvider } from '@mui/material'
import { Layout, Menu } from 'antd'
import { SwapOutlined, OrderedListOutlined } from '@ant-design/icons'
const { Header } = Layout


const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9e9e9e',
      contrastText: '#ffffff',
    },
  },
})

export default function App() {
  const location = useLocation()

  return (
    <ThemeProvider theme={theme}>
      <main className={styles.main}>
        <Header className={styles.header}>
          <Menu mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item icon={<SwapOutlined rev="twoToneColor" />} key="/">
              <Link to="/">Swap</Link>
            </Menu.Item>
            <Menu.Item icon={<OrderedListOutlined rev="twoToneColor" />} key="/transaction">
              <Link to="/transaction">Transaction</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<SwapPage />} />
            <Route path="/transaction" element={<PortfolioPage />} />
          </Routes>
        </main>
      </main>
    </ThemeProvider>
  )
}
