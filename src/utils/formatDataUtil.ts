import {format, parse, parseISO} from "date-fns";
import {toZonedTime} from "date-fns-tz";

export const formatDate = (dateString: string): string => {
    let date;
    if (dateString.includes('T')) {
        // Формат "YYYY-MM-DDTHH:mm:ssZ"
        date = parseISO(dateString);
    } else {
        // Формат "DD.MM.YYYY HH:mm:ss"
        date = parse(dateString, 'dd.MM.yyyy HH:mm:ss', new Date());
    }

    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = toZonedTime(date, browserTimeZone);

    // Форматируем дату в "ДЕНЬ.МЕСЯЦ.ГОД ЧАСЫ:МИНУТЫ:СЕКУНДЫ (UTC код часового пояса)"
    return format(zonedDate, 'dd.MM.yyyy HH:mm:ss (zzz)');
};