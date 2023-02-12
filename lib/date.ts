import { format } from 'date-fns'

const formattedDate = (date: Date, dateFormat: string) => {
    return format(date, dateFormat)
}

export const getToday = () => {
    const date = new Date()
    return formattedDate(date, 'yyyy-MM-dd')
}
