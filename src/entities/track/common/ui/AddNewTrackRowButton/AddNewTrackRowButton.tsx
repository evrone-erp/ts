import { Plus } from 'components/Icons/Plus';
import { Message } from 'entities/locale/ui/Message';
import { useAddNewTrackAction } from 'entities/track/common/lib/hooks/use-add-new-track-action';
import { DateWrapper } from 'features/date/lib/DateWrapper';
import { memo } from 'react';
import { useMessage } from 'entities/locale/lib/hooks';
import { STANDARD_WORK_DAY_START_LOCAL_HOUR } from 'features/date/lib/constants';
import styles from './AddNewTrackRowButton.module.scss';

interface IAddNewTrackRowButtonProps {
  issueKey: string;
}

export const AddNewTrackRowButton = memo(({ issueKey }: IAddNewTrackRowButtonProps) => {
  const addNewTrack = useAddNewTrackAction(issueKey);
  const message = useMessage();

  const handleClick = () => {
    const now = DateWrapper.getDate({ utcOffsetInMinutes: undefined });
    const dateWithStartHour = now.startOf('day').set('hour', STANDARD_WORK_DAY_START_LOCAL_HOUR);
    addNewTrack(dateWithStartHour);
  };

  return (
    <button className={styles.button} onClick={handleClick} type="button" aria-label={message('track.create.add')}>
      <Plus />
      <span>
        <Message id="track.create.add" />
      </span>
    </button>
  );
});
