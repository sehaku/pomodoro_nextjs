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
  handleEnd: () => number;
  handleSetIsRun: (v: boolean) => void;
  isRun: boolean;
  isPomodoro: boolean;
  progress: number;
};
export default class CountdownTimer extends Component<Props, {}> {
  autostart: boolean = false;
  countdownApi: CountdownApi | null = null;
  state = { date: Date.now() + this.props.duration };
  handleStartClick = (): void => {
    this.countdownApi && this.countdownApi.start();
    this.props.handleSetIsRun(true);
  };

  handlePauseClick = (): void => {
    this.countdownApi && this.countdownApi.pause();
    this.props.handleSetIsRun(false);
  };

  handleResetClick = (): void => {
    this.autostart = true;
    const duration = this.props.handleReset();
    this.setState({ date: Date.now() + duration });
    this.props.handleSetIsRun(true);
  };

  setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      this.countdownApi = countdown.getApi();
    }
  };

  handleEnd = (): void => {
    this.autostart = true;
    const duration = this.props.handleEnd();
    this.setState({ date: Date.now() + duration });
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
          autoStart={this.autostart}
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
