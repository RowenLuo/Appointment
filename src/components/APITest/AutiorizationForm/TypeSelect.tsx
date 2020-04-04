import * as React from 'react';
import { Select } from 'antd';

const { Option } = Select;
const authorationType = [
    'No Auth', 
    'API Key',
    'Bearer Token',
    'Basic Auth',
    'Digest Auth',
    'OAuth 1.0',
    'OAuth 2.0'
];

interface IProps {
    changeHandler: any;
}

class TpeSelect extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    handleChange = value => {
        console.log(value);    
        this.props.changeHandler(value);
    };

    render() {
        return (
            <div>
                <h4>Type</h4>
                <Select
                    defaultValue={authorationType[0]}
                    style={{ width: 200 }}
                    onChange={this.handleChange}
                >
                    {authorationType.map(authType => (
                        <Option key={authType}>{authType}</Option>
                    ))}
                </Select>
                <div style={{ height: "30px"}}></div>
            </div>
        );
    }
}

export default TpeSelect;