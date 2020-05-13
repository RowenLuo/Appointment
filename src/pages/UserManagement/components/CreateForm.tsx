import React, { useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { queryRole } from '../../RoleManagement/service';
import { querySystemCollage } from '@/pages/CollageManagement/service';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { name: string, phone: string; roleId: string, collegeId: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [list, setList] = useState([]);
  const [college, setCollage] = useState([]);

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };

  const handleSearch = async () => {
    const data = await queryRole();
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
          label="手机号"
          name="phone"
          rules={[{ required: true, message: "请输入手机号" }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="用户名"
          name="name"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="角色"
          name="roleId"
          rules={[{ required: true, message: "请选择用户角色" }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearch}
          >
            {
              list.map((item, index) => (
                <Option key={index} value={item.roleId}>{item.roleName}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学院"
          name="collegeId"
          rules={[{ required: true, message: "请选择用户所在学院" }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearchCollage}
          >
            {
              college.map((item, index) => (
                <Option key={index} value={item.collegeId}>{item.collegeName}</Option>
              ))
            }
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
