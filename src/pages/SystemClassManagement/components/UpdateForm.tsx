import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';
import { querySystemCollage } from '@/pages/CollageManagement/service'

import { TableListItem, SystemClass } from '../data.d';

export interface FormValueType extends Partial<SystemClass> {
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
  values: Partial<SystemClass>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

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
    classNumber: props.values.classNumber,
    classId: props.values.classId,
    collegeId: props.values.collegeId
  });

  const [form] = Form.useForm();
  const [college, setCollage] = useState([]);

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleSearchCollage = async () => {
    const data = await querySystemCollage();
    setCollage(data.data);
  }

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate(formVals);
  };

  const renderContent = () => {
      return (
        <>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="班级名"
            name="classNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入" />
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
      title="班级修改"
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
          classNumber: formVals.classNumber,
          collegeName: formVals.collegeName
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
