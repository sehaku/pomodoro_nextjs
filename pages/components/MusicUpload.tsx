import { ChangeEvent, useRef } from "react";
import { useSetRecoilState } from "recoil";
import {
  usrMusicSrcState,
  usrMusicState,
  fileTypeState,
} from "../../states/usrMusic";
import { IconButton, Input } from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";

const MusicUpload = () => {
  const inputRef = useRef<any>(null);
  const setUsrMusic = useSetRecoilState<HTMLAudioElement | null>(usrMusicState);
  const setUsrMusicSrc = useSetRecoilState<string>(usrMusicSrcState);
  const setFileType = useSetRecoilState<string>(fileTypeState);
  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("onChange!");
    const file = event.target.files?.[0];
    if (!(file instanceof File)) return;
    if (file.type.indexOf("audio") === -1) {
      alert("Please select a audio file.");
      return;
    }
    console.log(file.name);
    const file_type = file.name.split(".").pop();
    console.log("file_type", file_type, file, file.name);
    if (file_type) {
      setFileType(file_type);
    }
    const src = window.URL.createObjectURL(file);
    const audio = new Audio(src);
    setUsrMusic(audio);
    setUsrMusicSrc(src);
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
