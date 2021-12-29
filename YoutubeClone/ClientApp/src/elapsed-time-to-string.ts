const millisecondsPerYear = 31536000000;
const millisecondsPerMonth = 2628000000;
const millisecondsPerDay = 86400000;
const millisecondsPerHour = 3600000;
const millisecondsPerMinute = 60000;
const millisecondsPerSecond = 1000;

export default function elapsedTimeToString(elapsed: number): string {
    const rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' })

    if (Math.abs(elapsed) > millisecondsPerYear) {
        return rtf.format(Math.round(elapsed / millisecondsPerYear), 'year');
    } else if (Math.abs(elapsed) > millisecondsPerMonth) {
        return rtf.format(Math.round(elapsed / millisecondsPerMonth), 'month');
    } else if (Math.abs(elapsed) > millisecondsPerDay) {
        return rtf.format(Math.round(elapsed / millisecondsPerDay), 'day');
    } else if (Math.abs(elapsed) > millisecondsPerHour) {
        return rtf.format(Math.round(elapsed / millisecondsPerHour), 'hour');
    } else if (Math.abs(elapsed) > millisecondsPerMinute) {
        return rtf.format(Math.round(elapsed / millisecondsPerMinute), 'minute');
    } else {
        return rtf.format(Math.round(elapsed / millisecondsPerSecond), 'second');
    }
}