import { Select } from 'antd';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import { memo } from 'react';
import { useFilters } from 'features/filters/lib/useFilters';

interface IUserSelectProps {
  userOptions: DefaultOptionType[];
  allowClear: boolean;
  isLoading: boolean;
  setShouldLoad(nextValue: boolean): void;
  value: string | number | undefined;
}

export const UserSelect = memo(({ allowClear, userOptions, isLoading, setShouldLoad, value }: IUserSelectProps) => {
  const { updateUserId } = useFilters();

  const handleUserSelectClear = () => updateUserId(undefined);

  const handleUserSelect = (nextUserId: string) => {
    updateUserId(nextUserId);
  };

  return (
    <Select
      onDropdownVisibleChange={setShouldLoad}
      bordered={false}
      allowClear={allowClear}
      options={userOptions}
      value={value ? String(value) : undefined}
      loading={isLoading}
      onClear={handleUserSelectClear}
      onChange={handleUserSelect}
    />
  );
});
