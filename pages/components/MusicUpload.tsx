import { ChangeEvent, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  usrMusicNameState,
  usrMusicSrcState,
  usrMusicState,
} from "../../states/usrMusic";
import { IconButton, Input } from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";

const MusicUpload = () => {
  const inputRef = useRef<any>(null);
  const [usrMusic, setUsrMusic] = useRecoilState<HTMLAudioElement | null>(
    usrMusicState
  );
  const setUsrMusicName = useSetRecoilState<string>(usrMusicNameState);
  const setUsrMusicSrc = useSetRecoilState<string>(usrMusicSrcState);
  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("onChange!");
    const file = event.target.files?.[0];
    if (!(file instanceof File)) return;
    if (file.type.indexOf("audio") === -1) {
      alert("Please select a audio file.");
      return;
    }
    console.log(file.name);
    const src = window.URL.createObjectURL(file) + "#t=0.0,4.0";
    const audio = new Audio(src);
    setUsrMusic(audio);
    setUsrMusicName(file.name);
    setUsrMusicSrc(src);
    usrMusic?.pause();
    console.log(audio, file.name, src);
    event.target.value = "";
  };
  const fileUpload = () => {
    inputRef.current.click();
  };
  return (
    <>
      <Input
        accept="audio/*"
        id="file-input"
        multiple
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={onFileInputChange}
      />
      <IconButton
        aria-label="upload audio"
        color="secondary"
        component="span"
        htmlFor="file-input"
        size="md"
        variant="outline"
        onClick={fileUpload}
      >
        <FiFile />
      </IconButton>
    </>
  );
};
export default MusicUpload;
