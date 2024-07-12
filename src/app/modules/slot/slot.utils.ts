export const timeFormat = (date:Date) : string => {
    const hours = date.getHours().toString()
    const minutes = date.getMinutes().toString()

    return `${hours.padStart(2,'0')}:${minutes.padStart(2,'0')}`
}