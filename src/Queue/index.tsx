import React from "react";
import { Student } from "../App";
import QueueEntry from "./QueueEntry";

type QueueListProps = {
  students: Student[],
  onRemove: (GTID: number) => () => void,
};

export default function QueueList(props: QueueListProps): JSX.Element {
  const studentEntries: JSX.Element[] = props.students.map((student) => (
    <QueueEntry
      key={student.id}
      studentName={student.name}
      className="col-12 my-1"
      onRemove={props.onRemove(student.id)}
    />
  ));

  return (
    <div className="row">
      <div className="col-12">
        <h4>Students in Queue: </h4>
      </div>
      {studentEntries}
    </div>
  );
}
