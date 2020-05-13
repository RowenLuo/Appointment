import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import { queryRole } from '../../RoleManagement/service';
import { querySystemCollage } from '@/pages/CollageManagement/service';
import { SystemUser } from '../data.d';

export interface FormValueType extends Partial<SystemUser> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<SystemUser>;
}
const FormItem = Form.Item;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    phone: props.values.phone,
    name: props.values.name,
    roleId: props.values.roleId,
    collegeId: props.values.collegeId,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [form] = Form.useForm();

  const [list, setList] = useState([]);
  const [college, setCollage] = useState([]);

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleSearch = async () => {
    const data = await queryRole();
    setList(data.data);
  }

  const handleSearchCollage = async () => {
    const data = await querySystemCollage();
    setCollage(data.data);
  }

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="手机号"
          name="phone"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="用户名"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="角色"
          name="roleId"
          rules={[{ required: true }]}
        >
          <Select 
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
          rules={[{ required: true }]}
        >
          <Select 
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
      </>
    );
  };

  const renderFooter = () => {
      return (
        <>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            确定
          </Button>
        </>
      );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="用户修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          phone: formVals.phone,
          name: formVals.name,
          roleName: formVals.roleName,
          collegeName: formVals.collegeName
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
