import React from 'react';

type QueueEntryProps = {
  studentName: string,
  className?: string,
};

export default function QueueEntry(props: QueueEntryProps): JSX.Element {
  return (
    <div className={props.className}>
      <p>{props.studentName}</p>
    </div>
  );
}
