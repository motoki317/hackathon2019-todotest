import React from "react";

class Clock extends React.Component<{}, {date: Date}> {
  private timerID: number;

  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.timerID = 0;
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;
