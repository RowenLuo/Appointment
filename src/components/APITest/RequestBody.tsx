import * as React from 'react';
import { useState } from 'react';
import Radio from '@/components/APITest/RadioForm/FormRadio';
import NoneForm from './RadioForm/BodyForm/NoneForm';
import RawForm from './RadioForm/BodyForm/RawForm';
import { Row, Col, Divider } from 'antd';
import Form from 'antd/lib/form/Form';

const RequestBody: React.FC = () => {
    const [form, setForm] = useState(<NoneForm />)

    const changeForm = (value: number) => {
        console.log("ok", value);

        switch (true) {
            case value === 1:
                setForm(<NoneForm />)
                break;
            case value === 2:
                setForm(<NoneForm />)
                break;
            case value === 3:
                setForm(<NoneForm />)
                break;
            case value === 4:
                setForm(<RawForm />)
                break;
            case value === 5:
                setForm(<NoneForm />)
                break;
            case value === 6:
                setForm(<NoneForm />)
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Row gutter={[0, 32]}>
                <Col span={24}>
                    <Radio onChange={changeForm} />
                </Col>
            </Row>

            <Divider dashed />

            <Row>
                <Col span={24}>
                    {form}
                </Col>
            </Row>
        </div>
    );
}

export default RequestBody;