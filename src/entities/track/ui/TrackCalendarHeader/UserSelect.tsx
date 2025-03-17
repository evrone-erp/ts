import { Select } from 'antd';
import { useUser } from 'entities/user/hooks/use-user';
import { userApi } from 'entities/user/model/api';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import { memo, useMemo, useState } from 'react';
import { useFilters } from 'features/filters/lib/useFilters';

interface IUserSelectProps {
  userId?: string;
}

export const UserSelect = memo(({ userId }: IUserSelectProps) => {
  const [isUsersLoad, setIsUsersLoad] = useState(false);

  const { isLoading, data: users } = userApi.useGetUsersListQuery({}, { skip: !isUsersLoad });

  const { user } = useUser(userId);
  const { updateUserId } = useFilters();

  const userOptions: DefaultOptionType[] = useMemo(() => {
    if (users?.length) {
      return users.map((u) => ({ value: String(u.uid), label: u.display }));
    }
    return [{ value: String(user?.uid), label: user?.display }];
  }, [user, users]);

  const handleUserSelectClear = () => updateUserId(undefined);

  const handleUserSelect = (nextUserId: string) => {
    updateUserId(nextUserId);
  };

  return (
    <Select
      onDropdownVisibleChange={setIsUsersLoad}
      bordered={false}
      allowClear={!!userId}
      options={userOptions}
      value={user?.uid ? String(user?.uid) : undefined}
      loading={isLoading}
      onClear={handleUserSelectClear}
      onChange={handleUserSelect}
    />
  );
});
