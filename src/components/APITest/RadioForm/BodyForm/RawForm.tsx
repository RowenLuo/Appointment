import * as React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

class RawForm extends React.Component {
  render() {
    return (
        <div>
            <TextArea rows={8} />
        </div>
    );
  }
}

export default RawForm;