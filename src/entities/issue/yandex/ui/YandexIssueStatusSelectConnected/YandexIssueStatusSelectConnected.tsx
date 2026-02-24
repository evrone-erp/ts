import { yandexIssueApi } from 'entities/issue/yandex/model/yandex-api';
import { defaultLocale } from 'entities/locale/model/constants';
import type { TCurrentLocale } from 'entities/locale/model/types';
import type { TYandexTrackerConfig } from 'entities/tracker/model/types';
import type { IIssueStatusSelectProps } from 'entities/issue/common/ui/IssueStatusSelect/IssueStatusSelect';
import { IssueStatusSelect } from 'entities/issue/common/ui/IssueStatusSelect/IssueStatusSelect';

type TProps = Omit<IIssueStatusSelectProps, 'statusList' | 'isFetchingStatusList'> & {
  language: TCurrentLocale | undefined;
  tracker: TYandexTrackerConfig;
};

export const YandexIssueStatusSelectConnected = ({ language, tracker, ...props }: TProps) => {
  const { currentData: statusList, isFetching: isFetchingStatusList } = yandexIssueApi.useGetYandexStatusesQuery(
    { language: language ?? defaultLocale, tracker },
    { skip: !language },
  );

  return <IssueStatusSelect {...props} statusList={statusList} isFetchingStatusList={isFetchingStatusList} />;
};
