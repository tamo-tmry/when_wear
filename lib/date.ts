import { format } from 'date-fns'

export const formattedDate = (date: Date, dateFormat = 'yyyy-MM-dd') => {
    return format(date, dateFormat)
}

export const getToday = () => {
    const date = new Date()
    return formattedDate(date)
}
