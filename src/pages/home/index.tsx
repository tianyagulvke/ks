import React, {useEffect, useState} from 'react'
import {getData} from './services'
import {Col, Row, Card, Table} from 'antd'
import imgSrc from '@/assets/images/avatar.jpg'
import './index.scss'
import * as Icon from '@ant-design/icons'
import MyEcharts from '@/pages/components/echarts'
const Home = () => {
    const [homeData, setHomeData] = useState();
    const [tableData, setTableData] = useState([]);
    const [countData, setCountData] = useState([]);
    const [echartData, setEchartData] = useState({});

    useEffect(() => {
        getData().then((res: any)=> {
            console.log(res, 'res');
            setHomeData(res);
            setTableData(res.data.data.tableData);
            setCountData(res.data.data.countData);
            const {tableData, countData, orderData, userData, videoData} = res.data.data
            // 折线图series数组组装
            const arr = Object.keys(orderData.data[0]);
            const series = [];
            arr.forEach(key => {
                series.push({
                    name: key,
                    type: 'line',
                    stack: 'Total',
                    data: orderData.data.map(item => item[key])
                })
            })
            setEchartData({
                order: {
                    xData: orderData.date,
                    series
                },
                user: {
                    xData: userData.map(item => item.date),
                    series: [
                        {
                            name: '新增用户',
                            type: 'bar',
                            data: userData.map(item => item.new)
                        },
                        {
                            name: '活跃用户',
                            type: 'bar',
                            data: userData.map(item => item.active)
                        }
                    ]
                },
                video: {
                    series: [
                        {
                            data: videoData,
                            type: 'pie',
                            radius: '50%'
                        }
                    ]
                }
            })
        })
    },[])

    const columns = [
        {
          title: '课程',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '今日购买',
          dataIndex: 'todayBuy',
          key: 'todayBuy'
        },
        {
          title: '本月购买',
          dataIndex: 'monthBuy',
          key: 'monthBuy'
        },
        {
          title: '总购买',
          key: 'totalBuy',
          dataIndex: 'totalBuy'
        }
      ]
    // 动态获取icon
    const iconToElement = (name: string) => React.createElement(Icon[name]);
    return <Row className='home' gutter={20}>
        <Col span={8}>
            <Card hoverable>
                <div className='user'>
                    <img src={imgSrc} />
                    <div className='useInfo'>
                    <p className='name'>Admin</p>
                    <p className='role'>超级管理员</p>
                    </div>
                </div>
                <div className='login-info'>
                    <p>上次登录时间：<span>2024-07-17</span></p>
                    <p>上次登录地点： <span>成都</span></p>
                </div>
            </Card>
            <Card hoverable>
                <Table columns={columns} dataSource = {tableData} pagination={false} rowKey = {'name'}></Table>
            </Card>
        </Col>
        <Col span={16}>
            <div className='num'>
                {
                    countData.map((item: {
                        name: string,
                        value: number,
                        icon: string,
                        color: string
                    }, index) => {
                        return (
                            <Card  key={index}>
                                <div className='icon' style={{
                                    backgroundColor: item.color
                                }}>
                                    {iconToElement(item.icon)}
                                </div>
                                <div className='desc'>
                                    <p className='value'>￥{item.value}</p>
                                    <p className='name'>{item.name}</p>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
            {echartData?.order && (<MyEcharts chartData={echartData?.order} style={{height: '270px'}}/>)}
            <div className='chart'>
                {
                    echartData?.user && (<MyEcharts chartData={echartData?.user} style={{height: '220px', width: '50%'}}></MyEcharts>)
                }
                {
                    echartData?.video && (<MyEcharts chartData={echartData?.video} style={{height: '220px', width: '50%'}} />)
                }
            </div>
        </Col>
    </Row>
}
export default Home;