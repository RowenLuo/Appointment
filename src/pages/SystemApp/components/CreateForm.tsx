import React, { useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { querySystemCollage } from '@/pages/CollageManagement/service';
import { querySystemClass } from '@/pages/SystemClassManagement/service';
import { querySystemUsers } from '@/pages/UserManagement/service';
import { querySysteCourse } from '@/pages/MlassManagement/service';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { courseId: number, teacherId: number, classId: number, collegeId: number }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { Option } = Select;

  const [college, setCollege] = useState([]);
  const [classId, setClassId] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [course, setCourse] = useState([]);

  const handleSearchCollege = async () => {
    const data = await querySystemCollage();
    setCollege(data.data);
  }

  const handleSearchClassId = async () => {
    const data = await querySystemClass();
    setClassId(data.data);
  }

  const handleSearchTeacher = async () => {
    const data = await querySystemUsers();
    setTeacher(data.data);
  }

  const handleSearchCourse = async () => {
    const data = await querySysteCourse();
    setCourse(data.data);
  }

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="预约课程"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学院"
          name="collegeId"
          rules={[{ required: true }]}
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
          name="classId"
          rules={[{ required: true }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearchClassId}
          >
            {
              classId.map((item, index) => (
                <Option key={index} value={item.classId}>{item.className}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="老师"
          name="teacherId"
          rules={[{ required: true }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearchTeacher}
          >
            {
              teacher.map((item, index) => (
                <Option key={index} value={item.teacherId}>{item.teacherName}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="课程"
          name="courseId"
          rules={[{ required: true }]}
        >
          <Select 
           placeholder="请选择"
           filterOption={false}
           onFocus={handleSearchCourse}
          >
            {
              course.map((item, index) => (
                <Option key={index} value={item.courseId}>{item.courseName}</Option>
              ))
            }
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
