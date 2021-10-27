import { atom } from 'recoil'
export const pomodoroCount = atom({
    key: "pomodoroCount",
    default: 0
})
export const isPomodoroState = atom({
    key: "isPomodoroState",
    default: true
})
