import React, { Component } from "react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import Countdown, {
  CountdownApi,
  CountdownRenderProps,
  zeroPad,
} from "react-countdown";
type Props = {
  duration: number;
  handleEnd: () => void;
  handleSetIsRun: (v: boolean) => void;
  isRun: boolean;
  isPomodoro: boolean;
};
export default class CountdownTimer extends Component<Props, {}> {
  countdownApi: CountdownApi | null = null;
  state = { date: Date.now() + 10000 };
  handleStartClick = (): void => {
    console.log("start");
    this.countdownApi && this.countdownApi.start();
    this.props.handleSetIsRun(true);
  };

  handlePauseClick = (): void => {
    console.log("pause");
    this.countdownApi && this.countdownApi.pause();
    this.props.handleSetIsRun(false);
  };

  handleResetClick = (): void => {
    console.log("reset");
    this.setState({ date: Date.now() + this.props.duration });
    this.props.handleSetIsRun(true);
  };

  setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      this.countdownApi = countdown.getApi();
    }
  };

  handleEnd = (): void => {
    this.props.handleEnd();
    this.setState({ date: Date.now() + this.props.duration });
  };
  renderer = (render: CountdownRenderProps) => {
    return (
      <Text fontSize="9xl">
        {zeroPad(render.minutes, 2)}:{zeroPad(render.seconds, 2)}
      </Text>
    );
  };
  render() {
    return (
      <Flex alignItems="center" direction="column">
        <Countdown
          key={this.state.date}
          ref={this.setRef}
          date={this.state.date}
          autoStart={true}
          onComplete={this.handleEnd}
          renderer={this.renderer}
        />
        <ButtonGroup spacing="3">
          <Button
            display={this.props.isRun ? "none" : ""}
            onClick={this.handleStartClick}
          >
            Start
          </Button>
          <Button
            display={this.props.isRun ? "" : "none"}
            onClick={this.handlePauseClick}
          >
            Pause
          </Button>
          <Button onClick={this.handleResetClick}>Reset</Button>
        </ButtonGroup>
      </Flex>
    );
  }
}
