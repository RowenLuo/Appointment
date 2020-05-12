import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import { querySystemClass } from '../../SystemClassManagement/service';
import { querySystemCollage } from '@/pages/CollageManagement/service';
import { querySystemUsers } from '@/pages/UserManagement/service';
import { SystemCourse } from '../data.d';

export interface FormValueType extends Partial<SystemCourse> {
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
  values: Partial<SystemCourse>;
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
    name: props.values.name,
    collage: props.values.collage,
    class: props.values.class,
    teacher: props.values.teacher,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [form] = Form.useForm();

  const [list, setList] = useState([]);
  const [collage, setCollage] = useState([]);
  const [user, setUser] = useState([]);

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleSearch = async () => {
    const data = await querySystemClass();
    setList(data.data);
  }

  const handleSearchCollage = async () => {
    const data = await querySystemCollage();
    setCollage(data.data);
  }

  const handleSearchUser = async () => {
    const data = await querySystemUsers();
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
          label="课程名"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学院"
          name="collage"
          rules={[{ required: true }]}
        >
          <Select 
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
          rules={[{ required: true }]}
        >
          <Select 
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
          label="老师"
          name="teacher"
          rules={[{ required: true }]}
        >
          <Select 
           filterOption={false}
           onFocus={handleSearchUser}
          >
            {
              collage.map((item, index) => (
                <Option key={index} value={item.key}>{item.name}</Option>
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
      title="课程修改"
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
          name: formVals.name,
          collage: formVals.collage,
          class: formVals.class,
          teacher: formVals.teacher
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
