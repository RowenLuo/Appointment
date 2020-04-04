import * as React from 'react';
import { Input, Row, Col, Form } from 'antd';

const { TextArea } = Input;
class BearerTokenForm extends React.Component {

    render() {
        return (
            <Row>
                <Col span={16}>

                    <Form.Item
                        name="auth"
                    >
                        <TextArea rows={6} />
                    </Form.Item>
                </Col>
            </Row>
        );
    }
}

export default BearerTokenForm;