import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Card } from 'antd';
import { useState } from 'react';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import { readAnswerDetail } from '@/api';
const ImpQues = () => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', fileList[0] as RcFile);
    readAnswerDetail(formData).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        message.success('导入成功');
        setUploading(false);
        setFileList([]);
      }
    });
  };
  const props = {
    fileList,
    beforeUpload: (file: UploadFile) => {
      setFileList([file]);
      return false;
    },
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    maxCount: 1,
  };
  return (
    <Card style={{ height: 'calc(100vh - 112px)' }}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: '16px' }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </Card>
  );
};
export default ImpQues;
