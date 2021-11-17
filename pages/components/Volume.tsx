import { IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider";
import React, { useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import { useRecoilState } from "recoil";
import { isMuteState, volumeState } from "../../states/usrMusic";
export const Volume = () => {
  const [isMute, setIsMute] = useRecoilState<boolean>(isMuteState);
  const [volume, setVolume] = useRecoilState<number>(volumeState);
  const [prevVolume, setPrevVolume] = useState<number>(volume);
  const toggleMute = (isMute: boolean) => {
    if (isMute) {
      setVolume(prevVolume);
      console.log(volume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      console.log(volume);
    }
    setIsMute(!isMute);
  };
  return (
    <>
      <Box marginBottom="1" textAlign="center">Volume</Box>
      <Flex marginBottom="1" gridGap="5">
        <IconButton
          aria-label="Set Volume"
          icon={isMute ? <GoMute /> : <GoUnmute />}
          isRound={true}
          onClick={() => {
            toggleMute(isMute);
          }}
        ></IconButton>
        <Slider
          aria-label="slider-ex-1"
          value={volume}
          onChange={(v: number) => {
            setVolume(v);
            console.log(v, prevVolume, volume);
          }}
          onChangeEnd={(v: number) => {
            console.log(v, prevVolume, volume, "end");
            if (v === 0) {
              setIsMute(true);
            } else {
              setPrevVolume(v);
            }
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
    </>
  );
};
