import React, { useState } from 'react';
import { Card, Calendar, Input, Badge, Button, Modal, Select, message, DatePicker, Empty } from 'antd';
import { countDay, manualSet } from '@/api/workday'
import './index.scss';
const { RangePicker } = DatePicker;

export default function Workday() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [notes, setNotes] = useState("");

    const handleDateSelect = (date) => {
        setSelectedDate(date.format('YYYY-MM-DD'));
        console.log(date.format('YYYY-MM-DD'));
    };

    const [timeModalOpen, setTimeModalOpen] = useState(false); // 控制时间选择模态框的显示与隐藏
    const TimehandleOk = () => {
        if (surveyName === '100') {
            message.error("请选择出勤类型");
        } else {
            manualSet({
                "date": selectedDate,
                "dayOff": surveyName,
                "name": notes
            }).then(res => {
                setTimeModalOpen(false);
                setSurveyName("100")
                setNotes("")
            })
        }
    };
    const TimehandleCancel = () => {
        setTimeModalOpen(false);
    };

    const [surveyName, setSurveyName] = useState('100');
    const handleChange = (value) => {
        setSurveyName(value)
    };


    ////////////////
    const editTime = () => {
        if (selectedDate === null) {
            message.error("请选择日期");
        } else {
            setTimeModalOpen(true); // 打开时间选择模态框
        }
    }
    ///
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
    const [showtimeModalOpen, setShowtimeModalOpen] = useState(false); // 控制时间选择模态框的显示与隐藏
    const showTimehandleOk = () => {
        setDisno(false);
        setTimeRange([null, null]);
        setShowtimeModalOpen(false);
    }
    const showTimehandleCancel = () => {
        setShowtimeModalOpen(false);
    };
    const showTimeBtn = () => {
        setShowtimeModalOpen(true); // 打开时间选择模态框
    }
    const [timeRange, setTimeRange] = useState([null, null]); // 时间范围
    const onTimeRangeChange = (dates, dateStrings) => {
        setTimeRange([dates[0], dates[1]]);
        console.log(dateStrings); // 输出时间范围
    };
    const [badDayCount, setBadDayCount] = useState(0); //补班
    const [holidayCount, setHolidayCount] = useState(0); //法定假期
    const [issetHolidayCount, setIssetHolidayCount] = useState(0); //自定义假期
    const [workDayCount, setWorkDayCount] = useState(0); //工作日
    const isShowTimeBtn = () => {
        if (timeRange[0] !== null && timeRange[1] !== null) {
            countDay({
                "startDate": convertTemplateStringToDate(timeRange[0]),
                "endDate": convertTemplateStringToDate(timeRange[1])
            }).then(res => {
                setDisno(true);
                console.log(res.data.data);
                // res.data.data.badDayCount  //补班
                // res.data.data.holidayCount  //法定假期
                // res.data.data.setHolidayCount  //自定义假期
                // res.data.data.workDayCount  //工作日
                setBadDayCount(res.data.data.badDayCount);
                setHolidayCount(res.data.data.holidayCount);
                setIssetHolidayCount(res.data.data.setHolidayCount);
                setWorkDayCount(res.data.data.workDayCount);
            })
        } else {
            message.error("请选择时间范围");
        }
    }
    const [disno, setDisno] = useState(false);
    return (
        <Card style={{ height: 'calc(100vh - 112px)', overflowY: 'auto' }}>
            <div style={{ marginBottom: '-44px' }}>
                <Button type="primary" onClick={editTime}>编辑</Button>
                <Button style={{ marginLeft: '12px' }} type="primary" onClick={showTimeBtn}>查询</Button>
            </div>
            <Calendar
                onChange={handleDateSelect}
            />
            <Modal title={selectedDate} open={timeModalOpen} onOk={TimehandleOk} onCancel={TimehandleCancel}>
                <div style={{ marginTop: '20px' }}>
                    <span>请选择：</span>
                    <Select
                        defaultValue="全部"
                        value={surveyName}
                        style={{ width: 220 }}
                        onChange={handleChange}
                        options={[
                            { value: '100', label: '请选择' },
                            { value: '0', label: '上班' },
                            { value: '-1', label: '补班' },
                            { value: '1', label: '法定假期' },
                            { value: '11', label: '自定义假期' },
                        ]}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <span>备注：</span><br />
                    <Input.TextArea
                        rows={4}
                        style={{ marginTop: '10px' }}
                        maxLength={500}
                        value={notes}
                        onChange={(e) => {
                            setNotes(e.target.value);
                        }}
                    />
                </div>
            </Modal>
            <Modal title={"查询工作日"} open={showtimeModalOpen} onOk={showTimehandleOk} onCancel={showTimehandleCancel} footer={[
                <Button key="ok" type="primary" onClick={showTimehandleOk}>
                    确定
                </Button>,
            ]}>
                <div style={{ marginTop: '10px' }}>
                    <RangePicker value={timeRange} onChange={onTimeRangeChange} />
                    <Button style={{ marginLeft: '12px' }} type="primary" onClick={isShowTimeBtn}>查询</Button>
                </div>
                <div>
                    {
                        disno ? (
                            <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                <div style={{ lineHeight: '28px', fontSize: '16px' }}>{convertTemplateStringToDate(timeRange[0])} 到 {convertTemplateStringToDate(timeRange[1])}：</div>
                                <div style={{ lineHeight: '28px' }}>补班：{badDayCount}天</div>
                                <div style={{ lineHeight: '28px' }}>工作日：{workDayCount}天</div>
                                <div style={{ lineHeight: '28px' }}>法定假期：{holidayCount}天</div>
                                <div style={{ lineHeight: '28px' }}>自定义假期：{issetHolidayCount}天</div>
                            </div>
                        ) : (
                            <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                                <Empty description="请选择时间范围" />
                            </div>
                        )
                    }
                </div>
            </Modal>
        </Card >
    );
}
