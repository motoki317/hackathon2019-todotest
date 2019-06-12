import React from "react";
import styled from "styled-components";
import Timeout = NodeJS.Timeout;

interface Props {}
interface State {
  date: Date
}

const Text = styled.h2`
  color: lightsalmon;
`

class Clock extends React.Component<Props, State> {
  private timerID: Timeout;

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
        <Text>It is {this.state.date.toLocaleTimeString()}.</Text>
      </div>
    );
  }
}

export default Clock;
