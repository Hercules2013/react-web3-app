import { Route, Routes, Link, useLocation } from 'react-router-dom';

import SwapPage from './pages/Swap';
import PortfolioPage from './pages/Portfolio';

import styles from './App.module.css';

import { Layout, Menu } from 'antd';
import { SwapOutlined, OrderedListOutlined } from '@ant-design/icons';
const { Header } = Layout;

export default function App() {
  const location = useLocation();

  return (
    <main className={styles.main}>
      <Header style={{ backgroundColor: 'white', boxShadow: 'lightgray 0px 2px 5px' }}>
        <Menu mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item icon={<SwapOutlined rev="twoToneColor" />} key="/">
            <Link to="/">Swap</Link>
          </Menu.Item>
          <Menu.Item icon={<OrderedListOutlined rev="twoToneColor" />} key="/portfolio">
            <Link to="/portfolio">Portfolio</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <main style={{ margin: '1rem' }}>
        <Routes>
          <Route path="/" element={<SwapPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </main>
    </main>
  )
}
