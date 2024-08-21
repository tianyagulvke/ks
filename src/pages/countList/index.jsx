import React, { useState, useEffect } from 'react'
import { Table, Pagination, Button, Modal, Input, message, Card, Select } from "antd";
import { getAnswerRecordPage, readShortAnswerList, readAnswerDetail } from '@/api';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
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
        fetchData(current, pageSize);
    }
    const fetchData = (pageNum, pageSize) => {
        getAnswerRecordPage({
            pageNum,
            pageSize,
            userName,
            phone,
            surveyName,
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
                    message.success("阅卷成功");
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
            const data = res.data.data.map(item => ({
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
    const [msList, setMsList] = useState([]);
    const [sjAnswerId, setSjAnswerId] = useState();
    const sjMarking = (item) => {
        setSjIsModalOpen(true); // 打开模态框
        setSjAnswerId(item.id)
    }
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
                <Button type="primary" style={{ margin: '0px 0 20px 20px' }} onClick={() => fetchData(1, 10)} icon={<SearchOutlined />}>查询</Button>
                <Button type="default" style={{ margin: '0px 0 20px 20px' }} onClick={popSet} icon={<ReloadOutlined />}>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
            <br />
            <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                total={page.total}
                onChange={pageChange}
                align="end"
            />
            <Modal title="阅卷" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>{
                    jdtList.map((item) => {
                        return <div key={item.key}>
                            <p style={{ lineHeight: '32px' }}>题目：{item.question}</p>
                            <p style={{ lineHeight: '32px' }}>答案：{item.ret}</p>
                            <p style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <span>分数：</span>
                                <Input style={{ width: '120px', heighe: '22px' }} placeholder="简答题分数" min={0} max={100} type="number" value={item.score} onChange={(e) => fsChange(item, e)} />
                            </p>
                            <br />
                        </div>
                    })
                }</div>
            </Modal>
            <Modal title="面试详情" open={sjisModalOpen} onOk={sjhandleOk} onCancel={sjhandleCancel}>
                <div>123</div>
            </Modal>
        </Card>
    )
}
