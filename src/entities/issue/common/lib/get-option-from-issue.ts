import type { TIssue } from 'entities/issue/common/model/types';
import type { TOption } from 'shared/lib/types';

export const getOptionFromIssue = ({ key, summary }: TIssue): TOption => ({ label: `${key} - ${summary}`, value: key });
