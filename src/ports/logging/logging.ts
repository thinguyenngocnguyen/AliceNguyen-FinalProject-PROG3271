export default class Logging {
  public static readonly log = (args: any) => this.info(args);
  public static readonly info = (args: any) =>
    console.log(`[${getCurrentFormattedDateString()}] [INFO]`, args);
  public static readonly warn = (args: any) =>
    console.log(`[${getCurrentFormattedDateString()}] [WARNING]`, args);
  public static readonly error = (args: any) =>
    console.log(`[${getCurrentFormattedDateString()}] [ERROR]`, args);
}


export const getCurrentFormattedDateString = () => getFormattedShortDateTimeString();

export const getFormattedShortDateTimeString = () => {
  const date = new Date();
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
  }).format(date);
}
