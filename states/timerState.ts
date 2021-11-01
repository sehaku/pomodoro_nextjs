import { atom } from 'recoil'

export const timerState = atom({
    key: "timerState",
    default:25
})

export const breakState = atom({
    key: "breakState",
    default:5
})

export const longBreakState = atom({
    key: "longBreakState",
    default:15
})

export const curTypeTime = atom({
    key: "curTypeTime",
    default:25
})
