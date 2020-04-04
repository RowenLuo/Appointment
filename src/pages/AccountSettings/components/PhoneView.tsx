import React from 'react';

import { Input } from 'antd';
import styles from './PhoneView.less';

interface PhoneViewProps {
  value?: string;
  onChange?: (value: string) => void;
}

const PhoneView: React.FC<PhoneViewProps> = props => {
  const { value, onChange } = props;
  let values = ['', ''];
  if (value) {
    values = value.split('-');
  }

  return (
    <>
      <Input
        className={styles.phone_number}
        onChange={e => {
          if (onChange) {
            onChange(`${values[0]}-${e.target.value}`);
          }
        }}
        value={values[1]}
      />
    </>
  );
};

export default PhoneView;
