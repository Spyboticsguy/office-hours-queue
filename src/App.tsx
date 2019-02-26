import React, { Component } from "react";
import "./App.css";
import Authentication from "./Authentication";
import Header from "./Header";
import logo from "./logo.png";
import Queue from "./Queue";
import Uploader from "./Uploader";

type AppProps = {};
type AppState = {
  queue: Student[];
};

export type Student = {
  id: string;
  name: string;
};

class App extends Component<AppProps, AppState> {
  private buffer: string[];
  // max length of internal string buffer
  private BUFFER_LIMIT = 16;
  private BUFFER_CHECK_THRESHOLD = 15;
  private auth = new Authentication();

  constructor(props: AppProps) {
    super(props);

    this.state = {
      queue: [],
    };

    this.buffer = [];

    this.onGlobalKeyPress = this.onGlobalKeyPress.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  public componentDidMount() {
    document.addEventListener<"keypress">("keypress", this.onGlobalKeyPress);
  }

  public componentWillUnmount() {
    document.removeEventListener<"keypress">("keypress", this.onGlobalKeyPress);
  }

  public render(): JSX.Element {
    return (
      <div className="App">
        <div className="container-fluid">
        {/* header rows */}
          <div className="row align-items-center bg-light">
            <div className="col-sm-9">
              <Header logoURL={logo} />
            </div>
            <div className="col-sm-3">
              <h2>TAs on Duty</h2>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-9">
              <Queue
                students={this.state.queue}
                onRemove={this.removeStudent}
              />
              <Uploader
                onFileSubmit={() => null}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // handles buzzcard swipes
  private onGlobalKeyPress(ev: KeyboardEvent) {
    this.buffer.push(ev.key);
    // remove oldest element if we are over buffer size
    if (this.buffer.length > this.BUFFER_LIMIT) {
      this.buffer.shift();
    }

    // if we are over the threshold for checking for a buzzcard, do it
    if (this.buffer.length > this.BUFFER_CHECK_THRESHOLD) {
      this.checkBuzzcard();
    }

    // if we receive an enter keystroke, clear the buffer
    if (ev.key === "Enter") {
      this.buffer = [];
    }
  }

  // check if the buffer contains a valid buzzcard swipe
  private checkBuzzcard() {
    // join on empty string to get a string from the buffer
    const bufferAsString = this.buffer.join("");
    const bufferMatch = /;1570=9(\d{8})/gm.exec(bufferAsString);
    // check for a match
    if (bufferMatch !== null) {
      // slice off garbage at front of buzzcard read
      const foundGTID = bufferMatch[0].substring(6);
      // add student
      const student = this.auth.lookupStudent(+foundGTID);
      if (student) {
        this.addStudent(student);
      }
    }

    // clear buffer whenever we check for a new buzzcard number
    this.buffer = [];
  }

  // only adds a student to the queue if they are not already in the queue
  private addStudent(student: Student) {
    // look for student in queue; if not found, add them.
    if (!this.state.queue.find((studentInQueue) => {
      return student.id === studentInQueue.id;
    })) {
      this.setState({
        queue: [
          ...this.state.queue,
          student,
        ],
      });
    }
  }

  // removes the student with the given hashed GTID from the queue. Curried.
  private removeStudent = (hashedGTID: string) => () => {
    // get copy of the queue to modify without changing state
    const newQueue = [...this.state.queue];
    const indexOfStudent = newQueue.findIndex((value) => {
      return value.id === hashedGTID;
    });

    if (indexOfStudent >= 0) {
      newQueue.splice(indexOfStudent, 1);
      this.setState({
        queue: newQueue,
      });
    }
  }
}

export default App;
