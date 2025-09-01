import { Input } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';
import styles from 'entities/issue/common/ui/IssueSummarySearch/IssueSummarySearch.module.scss';

interface IIssueSummarySearchProps {
  defaultValue: string | undefined;
  onSearch(str: string): void;
}

export const IssueSummarySearch = ({ onSearch, defaultValue }: IIssueSummarySearchProps) => {
  const message = useMessage();

  return (
    <Input.Search
      className={styles.input}
      count={{ max: 300 }}
      defaultValue={defaultValue}
      onSearch={onSearch}
      placeholder={message('filter.summary.placeholder')}
      allowClear
    />
  );
};
