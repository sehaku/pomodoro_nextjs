import { atom, RecoilState } from 'recoil'
export const usrMusicState: RecoilState<any>  = atom({
    key: "usrMusicState",
    default: null
})

export const usrMusicNameState: RecoilState<string> = atom({
    key: "usrMusicNameState",
    default: ""
})
export const usrMusicSrcState: RecoilState<string> = atom({
    key: "usrMusicSrcState",
    default: ""
})

export const volumeState = atom({
    key: "volumeState",
    default: 100
})

export const isMuteState = atom({
    key: "isMuteState",
    default: false
})

export const fileTypeState = atom({
    key: "fileTypeState",
    default: defaultMusicFileType
})
