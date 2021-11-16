import { BaseSyntheticEvent, ReactNode, useRef } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
} from "@chakra-ui/react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { FiFile } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { usrMusicNameState, usrMusicState } from "../../states/usrMusic";

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept: string;
  multiple: boolean;
  children?: ReactNode;
  onChange: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement) => void;
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={"file"}
        multiple={false}
        hidden
        accept={accept}
        {...rest}
        ref={(e: HTMLInputElement) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
};

type FormValues = {
  file_: FileList;
};

const Upload = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [usrMusic, setUsrMusic] = useRecoilState<HTMLAudioElement | null>(
    usrMusicState
  );
  const [usrMusicName, setUsrMusicName] =
    useRecoilState<string>(usrMusicNameState);
  const onSubmit = handleSubmit((data) => console.log("On Submit: ", data));

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Files is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    const file = value[0];
    const src = window.URL.createObjectURL(file);
    const audio = new Audio(src);
    setUsrMusic(audio);
    setUsrMusicName(file.name);
    return true;
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.file_} isRequired>
          <FormLabel>{"File input"}</FormLabel>

          <FileUpload
            accept={"audio/*"}
            multiple={false}
            register={register("file_", { validate: validateFiles })}
            onChange={onSubmit}
          >
            <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
          </FileUpload>

          <FormErrorMessage>
            {errors.file_ && errors?.file_.message}
          </FormErrorMessage>
        </FormControl>

        <button>Submit</button>
      </form>
    </>
  );
};

export default Upload;
