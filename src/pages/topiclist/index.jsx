import React, { useState, useEffect } from 'react';
import { Table, Pagination, Card, Popconfirm, message, Select, Button } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { getQuestionList, deleteBatch } from '@/api/topiclist.tsx';
import './index.scss';

export default function Topic() {
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState({
        pageNum: 1,
        pageSize: 10,
        total: 0,
    });
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        fetchData(page.pageNum, page.pageSize);
    }, [page.pageNum, page.pageSize]);

    const fetchData = (pageNum, pageSize) => {
        getQuestionList({ pageNum, pageSize, category: catagory, stype: type })
            .then((res) => {
                const list = res.data.data.list;

                const maxOptions = list.reduce((max, item) => {
                    return Math.max(max, (item.optionList && item.optionList.length) || 0);
                }, 0);

                const data = list.map(item => {
                    const optionsData = item.optionList || [];
                    const correctOptionIndex = optionsData.findIndex(option => option.flag === '1') + 1; // 1-based index
                    return {
                        ...item,
                        key: item.id,
                        ...optionsData.reduce((acc, option, index) => ({
                            ...acc,
                            [`option_${index}`]: option.qoption,
                        }), {}),
                        correctAnswer: correctOptionIndex > 0 ? `选项 ${correctOptionIndex}` : '-'
                    };
                });

                const optionsColumns = Array.from({ length: maxOptions }, (_, index) => ({
                    title: `选项 ${index + 1}`,
                    dataIndex: `option_${index}`,
                    key: `option_${index}`,
                    render: (text) => text || '-',
                }));

                const newColumns = [
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: '题目',
                        dataIndex: 'question',
                        key: 'question',
                    },
                    ...optionsColumns,
                    {
                        title: '正确答案',
                        dataIndex: 'correctAnswer',
                        key: 'correctAnswer',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (text, record) => (
                            <Popconfirm
                                title="删除"
                                description={`确认要删除 ${record.question} 这道题目？`}
                                onConfirm={() => confirm(record)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a>删除</a>
                            </Popconfirm>
                        ),
                    }
                ];

                setDataSource(data);
                setPage(prevPage => ({
                    ...prevPage,
                    total: res.data.data.total
                }));
                setColumns(newColumns);
            })
            .catch(error => {
                message.error("数据加载失败");
            });
    };

    const onShowSizeChange = (current, pageSize) => {
        fetchData(current, pageSize);
    };

    const pageChange = (current, pageSize) => {
        setPage(prevPage => ({
            ...prevPage,
            pageNum: current,
            pageSize
        }));
        fetchData(current, pageSize);
    };

    const confirm = (record) => {
        deleteBatch(record.id).then(res => {
            if (res.data.code === 200) {
                fetchData(page.pageNum, page.pageSize);
                message.success('删除成功');
            } else {
                message.error("删除失败");
            }
        }).catch(() => {
            message.error("删除失败");
        });
    };

    const cancel = (e) => {
        // Handle cancel action if needed
    };

    const [catagory, setCatagory] = useState('');
    const [type, setType] = useState('');
    const gwhandleChange = (value) => {
        setCatagory(value)
    };
    const txhandleChange = (value) => {
        setType(value)
    };
    const showList = () => {
        fetchData(1, page.pageSize);
        setPage({
            ...page,
            pageNum: 1,
        });
    }
    const popSet = () => {
        setCatagory('');
        setType('');
        message.success("重置成功");
    }
    return (
        <Card style={{ height: 'calc(100vh - 112px)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ margin: '0px 0 20px 0' }}><span>题型：</span>
                    <Select
                        defaultValue="全部"
                        value={type}
                        style={{ width: 220 }}
                        onChange={txhandleChange}
                        options={[
                            { value: '', label: '全部' },
                            { value: '1', label: '公共' },
                            { value: '2', label: '单选' },
                            { value: '4', label: '判断' },
                            { value: '5', label: '简答' },
                        ]}
                    /></div>
                <div style={{ margin: '0px 0 20px 20px' }}><span>岗位：</span>
                    <Select
                        defaultValue="全部"
                        value={catagory}
                        style={{ width: 220 }}
                        onChange={gwhandleChange}
                        options={[
                            { value: '', label: '全部' },
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
        </Card>
    );
}
