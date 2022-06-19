import CompeteExam from "../../exam/CompeteExam"
import MyProgress from "../../exam/MyProgress"
import QuickExam from "../../exam/QuickExam"
import Emphasize from "../../animations/Emphasize"
import LeftRight from "../../animations/LeftRight"

export const examTopics=[
    {
        label: 'Take Quick Exam',
        path: '/quickExam',
        element: <QuickExam></QuickExam>
    }, {
        label: 'Compete with others',
        path: '/competeExam',
        element: <CompeteExam></CompeteExam>
    }, {
        label: 'My progress',
        path: '/myProgress',
        element: <MyProgress></MyProgress>
    },
]

