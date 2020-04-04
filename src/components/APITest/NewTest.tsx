import * as React from 'react';
import { Input, Select, Tabs, Button, Row, Col, Form } from 'antd';
import RequestHeader from './RequestHeader';
import RequestBody from './RequestBody';
import Authorization from './Authorization';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const callback = (key: any) => {
    console.log(key);
}



const NewTest: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
    };

    const selectBefore = (
        <Form.Item name="method" noStyle>
            <Select defaultValue="GET" style={{ width: 90 }}>
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
                <Option value="PUT">PUT</Option>
                <Option value="PATCH">PATCH</Option>
                <Option value="DELETE">DELETE</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Form
                 form={form}
                 name="newtest"
                 initialValues={{ method: 'GET' }}
                 onFinish={onFinish}
                >
                    <Row gutter={[16, 32]}>
                        <Col span={22}>
                            <Form.Item
                                name="url" 
                                rules={[{ required: true, message: '请输入URL！'}]}
                            >
                                <Input addonBefore={selectBefore} size={"large"} />
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size={"large"}>测试</Button>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[0, 32]}>
                        <Col span={24}>
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="请求头部" key="1">
                                    <RequestHeader />
                                </TabPane>
                                <TabPane tab="请求体" key="2">
                                    <Form.Item>
                                        <RequestBody />
                                    </Form.Item>
                                </TabPane>
                                <TabPane tab="Query参数" key="3">
                                    Content of Tab Pane 3
                                </TabPane>
                                <TabPane tab="REST参数" key="4">
                                    Content of Tab Pane 3
                                </TabPane>
                                <TabPane tab="权限校验" key="5">
                                    <Authorization />
                                </TabPane>
                                <TabPane tab="预处理" key="6">
                                    <TextArea rows={12} />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Form>

                <Row>
                    <Col span={24}>
                        <Tabs defaultActiveKey="2" onChange={callback}>
                            <TabPane tab="响应结果" key="6">
                                <TextArea rows={10} />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default NewTest;
