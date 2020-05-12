import React, { useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { querySystemClass } from '@/pages/SystemClassManagement/service';
import { querySystemCollage } from '@/pages/CollageManagement/service';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { name: string, collage: string, class: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [list, setList] = useState([]);
  const [collage, setCollage] = useState([]);

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };

  const handleSearch = async () => {
    const data = await querySystemClass();
    setList(data.data);
  }

  const handleSearchCollage = async () => {
    const data = await querySystemCollage();
    setCollage(data.data);
  }

  return (
    <Modal
      destroyOnClose
      title="新建用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="课程名"
          name="name"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学院"
          name="collage"
          rules={[{ required: true, message: "请选择学院" }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearchCollage}
          >
            {
              list.map((item, index) => (
                <Option key={index} value={item.key}>{item.name}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="班级"
          name="class"
          rules={[{ required: true, message: "请选择班级" }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearch}
          >
            {
              collage.map((item, index) => (
                <Option key={index} value={item.key}>{item.name}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="班级"
          name="class"
          rules={[{ required: true, message: "请选择班级" }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearch}
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
