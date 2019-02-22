import React from "react";
import { Student } from "../App";
import QueueEntry from "./QueueEntry";

type QueueListProps = {
  students: Student[],
};

export default function QueueList(props: QueueListProps): JSX.Element {
  const studentEntries: JSX.Element[] = props.students.map((student, index) => (
    <QueueEntry
      key={student.id}
      studentName={student.name}
      className="col-12"
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
