import { Input as AntInput } from 'antd';
import { TextAreaProps } from 'antd/lib/input/TextArea';
import { forwardRef } from 'react';
import styles from './TextArea.module.scss';

const { TextArea: AntTextArea } = AntInput;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className = '', ...props }, ref) => (
  <AntTextArea {...props} className={`${styles.textarea} ${className}`} ref={ref} />
));
