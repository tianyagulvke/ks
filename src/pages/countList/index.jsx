import React, { useState, useEffect } from 'react'
import { Table, Pagination, Button, Modal, Input, message, Card, Select, Radio, Empty } from "antd";
import { getAnswerRecordPage, readShortAnswerList, readAnswerDetail } from '@/api';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import './index.scss'
export default function CountList() {
    useEffect(() => {
        fetchData(page.pageNum, page.pageSize)
    }, [])
    //时间格式转换
    const convertTemplateStringToDate = date => {
        const newdate = new Date(date);
        const year = newdate.getFullYear();
        const month = (newdate.getMonth() + 1).toString().padStart(2, "0");
        const day = newdate.getDate().toString().padStart(2, "0");
        const hours = newdate.getHours().toString().padStart(2, "0");
        const minutes = newdate.getMinutes().toString().padStart(2, "0");
        const seconds = newdate.getSeconds().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
        // ${hours}:${minutes}:${seconds}时分秒
    };
    const [page, setPage] = useState({
        pageNum: 1,
        pageSize: 10,
        total: 0,
    }); //分页
    const onShowSizeChange = (current, pageSize) => {
        fetchData(current, pageSize);
    };
    const pageChange = (current, pageSize) => {
        setPage({
            ...page,
            pageNum: current,
        });
        fetchData(current, pageSize);
    }
    const [cxCode200, setCxCode200] = useState(false)
    const fetchData = (pageNum, pageSize) => {
        getAnswerRecordPage({
            pageNum,
            pageSize,
            name: userName,
            phone: phone,
            stype: surveyName,
        })
            .then((res) => {
                const data = res.data.data.list.map(item => ({
                    ...item,
                    key: item.id // 确保每个项都有唯一的 `key`
                }));
                setDataSource(data);
                setPage(prevPage => ({
                    ...prevPage,
                    total: res.data.data.total
                }));
                if (res.data.code === 200) {
                    setCxCode200(true)
                } else {
                    message.error(res.data.msg)
                }
            });
    };
    const [dataSource, setDataSource] = useState([]);



    const [columns, setColumns] = useState([
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'userName',
        },
        {
            title: '性别',
            dataIndex: 'gender',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '应聘岗位',
            dataIndex: 'surveyName',
            sorter: {
                compare: (a, b) => a.surveyName.localeCompare(b.surveyName, 'zh'),
            },
        },
        {
            title: '答题时间',
            dataIndex: 'startDate',
            render: (text) => convertTemplateStringToDate(text),
        },
        {
            title: '分数（60分及格）',
            dataIndex: 'score',
            sorter: {
                compare: (a, b) => a.score - b.score,
            },
        },
        {
            title: '操作',
            render: (text, record) => (
                <>
                    <a onClick={() => Marking(record)}>阅卷</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a onClick={() => sjMarking(record)}>查看详情</a>
                </>
            ),
        }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 控制模态框显示与隐藏的状态
    const handleOk = () => {
        let valid = true;
        const updatedJdt = [];
        jdtList.forEach((item) => {
            if (item.score === '') {
                message.warning("请打分");
                valid = false;
            } else if (item.score > 100) {
                message.error("分数不能超过100");
                valid = false;
            } else if (item.score < 0) {
                message.error("分数不能小于0");
                valid = false;
            } else {
                updatedJdt.push(Number(item.score));
            }
        });
        // for (const item of jdtList) {
        //     if (item.score === '') {
        //         message.warning("请打分");
        //         valid = false;
        //     } else if (item.score > 100) {
        //         message.error("分数不能超过100");
        //         valid = false;
        //     } else if (item.score < 0) {
        //         message.error("分数不能小于0");
        //         valid = false;
        //     } else {
        //         updatedJdt.push(Number(item.score));
        //     }
        // }

        if (valid) {
            setJdt(updatedJdt);
            readAnswerDetail({
                answerId: answerId,
                shortScores: updatedJdt
            }).then(res => {
                if (res.data.code === 200) {
                    if (jdtList.length > 0) {
                        message.success("阅卷成功");
                    }
                    setIsModalOpen(false);
                    fetchData(page.pageNum, page.pageSize);
                }
            });
        } else {
            setJdt([]);
        }
    };

    const handleCancel = () => {
        setJdt()
        setIsModalOpen(false);
    };
    const [jdtList, setJdtList] = useState([]);
    const [answerId, setAnswerId] = useState();
    const Marking = (record) => {
        setAnswerId(record.id)
        readShortAnswerList({
            answerId: record.id
        }).then(res => {
            const data = res.data.data.shortAnswer.map(item => ({
                ...item,
                key: item.id // 确保每个项都有唯一的 `key`
            }));
            setJdtList(data);
        })
        setIsModalOpen(true); // 打开模态框
    }
    const [jdt, setJdt] = useState([])
    const fsChange = (item, e) => {
        const newScore = e.target.value;
        const newList = [...jdtList];
        item.score = newScore;
        setJdtList(newList);
    };
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [surveyName, setSurveyName] = useState('1');

    const [sjisModalOpen, setSjIsModalOpen] = useState(false);
    const [msListsingleMap, setMsListsingleMap] = useState([]);
    const [msListshortAnswer, setMsListshortAnswer] = useState([]);
    const [sjAnswerId, setSjAnswerId] = useState();
    const [xqList, setXqList] = useState({});
    const sjMarking = (item) => {
        setXqList(item);
        setSjIsModalOpen(true); // 打开模态框
        setSjAnswerId(item.id);

        readShortAnswerList({ answerId: item.id }).then(res => {
            setMsListsingleMap(res.data.data.singleMap);
            setMsListshortAnswer(res.data.data.shortAnswer);
            console.log(res.data.data.singleMap);
            console.log(res.data.data.shortAnswer);
        });
    };
    const sjhandleOk = () => {
        setSjIsModalOpen(false);
    };
    const sjhandleCancel = () => {
        setSjIsModalOpen(false);
    }
    const handleChange = (value) => {
        setSurveyName(value)
    };
    const popSet = () => {
        setUserName('');
        setPhone('');
        setSurveyName('1');
        message.success("重置成功");
    }
    const showList = () => {
        if (cxCode200 === true) {
            message.success("查询成功");
        }
        fetchData(1, page.pageSize);
        setPage({
            ...page,
            pageNum: 1,
        });
    }
    return (
        <Card style={{ height: 'calc(100vh - 112px)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ margin: '0px 0 20px 0px' }}><span>姓名：</span>
                    <Input style={{ width: '220px' }} placeholder="请输入姓名" value={userName} onChange={(e) => setUserName(e.target.value)} /></div>
                <div style={{ margin: '0px 0 20px 20px' }}><span>手机号：</span>
                    <Input style={{ width: '220px' }} placeholder="请输入手机号" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                <div style={{ margin: '0px 0 20px 20px' }}><span>应聘岗位：</span>
                    <Select
                        defaultValue="全部"
                        value={surveyName}
                        style={{ width: 220 }}
                        onChange={handleChange}
                        options={[
                            { value: '1', label: '全部' },
                            { value: '2', label: 'java后端' },
                            { value: '3', label: 'web前端' },
                            { value: '4', label: '需求分析' },
                        ]}
                    /></div>
                <Button type="primary" style={{ margin: '0px 0 20px 20px' }} onClick={showList} icon={<SearchOutlined />}>查询</Button>
                <Button type="default" style={{ margin: '0px 0 20px 20px' }} onClick={popSet} icon={<ReloadOutlined />}>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} rowClassName="custom-row" />
            <br />
            <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={page.pageNum}
                current={page.pageNum}
                total={page.total}
                onChange={pageChange}
                align="end"
            />
            <Modal title="阅卷" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    {jdtList.length > 0 ? (
                        jdtList.map((item) => (
                            <div key={item.key}>
                                <p style={{ lineHeight: '32px' }}>题目：{item.question}</p>
                                <p style={{ lineHeight: '32px' }}>答案：{item.ret}</p>
                                <p style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                    <span>分数：</span>
                                    <Input
                                        style={{ width: '120px', height: '22px' }} // 修正了 'heighe' 为 'height'
                                        placeholder="简答题分数"
                                        min={0}
                                        max={100}
                                        type="number"
                                        value={item.score}
                                        onChange={(e) => fsChange(item, e)}
                                    />
                                </p>
                                <br />
                            </div>
                        ))
                    ) : (
                        // <p style={{ lineHeight: '100px', textAlign: 'center' }}>暂无答题记录</p>
                        <Empty description="暂无答题记录" />
                    )}
                </div>
            </Modal>
            <Modal title="面试详情" open={sjisModalOpen} onOk={sjhandleOk} onCancel={sjhandleCancel} footer={[
                <Button key="ok" type="primary" onClick={sjhandleOk}>
                    确定
                </Button>,
            ]}>
                <div className="msrlist">
                    <p className="msrlistp"><span className="msrlistspan">姓名：</span>{xqList.userName}</p>
                    <p className="msrlistp"><span className="msrlistspan">性别：</span>{xqList.gender}</p>
                    <p className="msrlistp"><span className="msrlistspan">电话：</span>{xqList.phone}</p>
                    <p className="msrlistp"><span className="msrlistspan">岗位：</span>{xqList.surveyName}</p>
                    <p className="msrlistp"><span className="msrlistspan">成绩：</span>{xqList.score}</p>
                    <hr />
                    <div>
                        <div>答题详情：</div>
                        <div className='dtxqBox' style={{ width: '100%', minHeight: '0', maxHeight: '310px', overflowY: 'auto' }}>
                            {msListsingleMap.length > 0 || msListshortAnswer.length > 0 ? (
                                <>
                                    <div>
                                        {msListsingleMap.map((item, index) => (
                                            <div key={index}>
                                                <p style={{ lineHeight: '32px' }}>题目：{item[0].question}</p>
                                                <div style={{ lineHeight: '32px' }}>选项：
                                                    <br />
                                                    <div>
                                                        {item.map((item1, index1) => (
                                                            <p style={{
                                                                whiteSpace: 'normal',
                                                                wordWrap: 'break-word',
                                                                wordBreak: 'break-all',
                                                            }} key={index1}>
                                                                <Radio.Group value={item1.ret} disabled>
                                                                    <Radio value={item1.qoption}>{item1.qoption}</Radio>
                                                                </Radio.Group>
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p>正确答案：{
                                                    (() => {
                                                        let result = [];
                                                        for (let i = 0; i < item.length; i++) {
                                                            if (item[i].flag === "1") {
                                                                result.push(item[i].qoption);
                                                            }
                                                        }
                                                        return result.join(', ');
                                                    })()
                                                }</p>
                                                <hr />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {msListshortAnswer.map((item) => (
                                            <div key={item.id}>
                                                <p style={{ lineHeight: '32px' }}>题目：{item.question}</p>
                                                <p style={{ lineHeight: '32px' }}>答案：{item.ret}</p>
                                                <hr />
                                            </div>
                                        ))}
                                    </div>

                                </>
                            ) : (
                                // <p style={{ lineHeight: '100px', textAlign: 'center' }}>暂无答题记录</p>
                                <Empty description="暂无答题记录" />
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </Card >
    )
}
