import * as React from 'react';
import { Radio } from 'antd';

interface IProps {
    onChange: any;
}

interface IState {
    value: any;
}

class FormRadio extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: 1,
        };
    }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>none</Radio>
        <Radio value={2}>form-data</Radio>
        <Radio value={3}>x-www-form-urlencoded</Radio>
        <Radio value={4}>raw</Radio>
        <Radio value={5}>binary</Radio>
        <Radio value={6}>GraphQL</Radio>
      </Radio.Group>
    );
  }
}

export default FormRadio;