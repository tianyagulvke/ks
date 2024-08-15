// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
// antd部分
import {ConfigProvider} from 'antd'
import "dayjs/locale/zh-cn"
import zhCN from 'antd/locale/zh_CN'
import {Provider} from 'react-redux'
import store from './store'
import '@/utils/mock.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
  // </StrictMode>,
)
