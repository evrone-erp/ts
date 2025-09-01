import { TIssue } from 'entities/issue/common/model/types';
import { TOption } from 'shared/lib/types';

export const getOptionFromIssue = ({ key, summary }: TIssue): TOption => ({ label: `${key} - ${summary}`, value: key });
