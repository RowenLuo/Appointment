import React, { useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { queryCollage } from '@/pages/CollageManagement/service';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { name: string, collage: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [collage, setCollage] = useState([]);
 
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };

  const handleSearchCollage = async () => {
    const data = await queryCollage();
    setCollage(data.data);
  } 
  return (
    <Modal
      destroyOnClose
      title="新建班级"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="班级名"
          name="name"
          rules={[{ required: true}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学院"
          name="collage"
          rules={[{ required: true, message: "请选择用户所在学院" }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearchCollage}
          >
            {
              collage.map((item, index) => (
                <Option key={index} value={item.key}>{item.name}</Option>
              ))
            }
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
