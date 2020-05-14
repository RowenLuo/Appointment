import React, { useState } from 'react';
import { Form, Input, Modal, Select, Checkbox, Row, Col, DatePicker, TimePicker } from 'antd';
import { querySystemClass } from '@/pages/SystemClassManagement/service';
import { querySystemCollage } from '@/pages/CollageManagement/service';
import { querySystemUsers } from '@/pages/UserManagement/service';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TimeRangePicker = TimePicker.RangePicker;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { courseName: string, collegeId: string, classId: string, teacherId: string, date: string, week: string, time: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [list, setList] = useState([]);
  const [college, setCollage] = useState([]);
  const [teacher, setTeacher] = useState([]);

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

  const handleSearchCollege = async () => {
    const data = await querySystemCollage();
    setCollage(data.data);
  }

  const handleSearchTeacher = async () => {
    const data = await querySystemUsers();
    setTeacher(data.data);
  }

  const onFinish = (value) => {
    console.log(value);
    form.setFieldsValue({nn: "123"});
    console.log(value);
  }

  return (
    <Modal
      destroyOnClose
      title="新建用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form} onFinish={onFinish}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="课程名"
          name="courseName"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学院"
          name="collegeId"
          rules={[{ required: false, message: "请选择学院" }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearchCollege}
          >
            {
              college.map((item, index) => (
                <Option key={index} value={item.collegeId}>{item.collegeName}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="班级"
          name="class"
          rules={[{ required: false, message: "请选择班级" }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearch}
          >
            {
              list.map((item, index) => (
                <Option key={index} value={item.classId}>{item.classNumber}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="老师"
          name="teacherId"
          rules={[{ required: false, message: "请选择老师" }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearchTeacher}
          >
            {
              teacher.map((item, index) => (
                <Option key={index} value={item.key}>{item.name}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="起始日期"
          name="date"
          rules={[{ required: true, message: "请选择起始日期" }]}
        >
          <RangePicker />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="教学周"
          name="week"
          rules={[{ required: true, message: "请选择起始日期" }]}
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              <Col span={8}>
                <Checkbox value="mon">周一</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="tues">周二</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="wed">周三</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="thurs">周四</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="fri">周五</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="时间"
          name="time"
          rules={[{ required: true, message: "请选择起始日期" }]}
        >
          <TimeRangePicker picker="time" showSecond={false} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
