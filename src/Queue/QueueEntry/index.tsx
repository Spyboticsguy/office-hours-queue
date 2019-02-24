import React from "react";

type QueueEntryProps = {
  studentName: string,
  className?: string,
  onRemove: () => void,
};

export default function QueueEntry(props: QueueEntryProps): JSX.Element {
  return (
    <div className={props.className}>
      <div className="d-inline">{props.studentName}</div>
      <button
        className="btn btn-outline-danger float-right"
        onClick={props.onRemove}
      >
        Remove
      </button>
    </div>
  );
}
