import * as React from 'react';
import { Row, Col, Divider, Form } from 'antd';
import TypeSelect from './AutiorizationForm/TypeSelect';
import NoneForm from './AutiorizationForm/DisplayForm/NoneForm';
import BearerTokenForm from './AutiorizationForm/DisplayForm/BearerTokenForm';

interface IState {
    displayForm: any;
}

class Authorization extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            displayForm: <NoneForm />
        }
    }

    const changeHandler = (selectType: string) => {
        switch (selectType) {
            case 'No Auth':
                this.setState({
                    displayForm: <NoneForm />
                });
                break;
            case 'API Key':
                this.setState({
                    displayForm: <div></div>
                });
                break;
            case 'Bearer Token':
                this.setState({
                    displayForm: <BearerTokenForm />
                });
                break;
            case 'Basic Auth':
                this.setState({
                    displayForm: <div></div>
                });
                break;
            case 'Digest Auth':
                this.setState({
                    displayForm: <div></div>
                });
                break;
            case 'OAuth 1.0':
                this.setState({
                    displayForm: <div></div>
                });
                break;
            case 'OAuth 2.0':
                this.setState({
                    displayForm: <div></div>
                });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <TypeSelect changeHandler={this.changeHandler} />
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <div>
                            <Divider dashed />
                            {this.state.displayForm}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Authorization;