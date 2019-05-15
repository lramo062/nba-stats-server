import moment from 'moment';

export class DateFormatter {
  public static toISOString(date: string) {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss');
  }
  public static toReadableDate(date: string) {
    return moment(date).format('MM/DD/YYYY');
  }
}
