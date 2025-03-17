import { useGlobalLoader } from 'shared/api';
import { Spin } from 'antd';

export const GlobalFetching = () => {
  const isFetching = useGlobalLoader();

  return isFetching ? <Spin size="small" /> : null;
};
