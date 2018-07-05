
const MONTHS = [
  "ENERO",
  "FEBRERO",
  "MARZO",
  "ABRIL",
  "MAYO",
  "JUNIO",
  "JULIO",
  "AGOSTO",
  "SEPTIEMBRE",
  "OCTUBRE",
  "NOVIEMBRE",
  "DICIEMBRE"
];

interface DescDate {
  year: number;
  monthNumber: number;
  dayOfMonth: number;
  monthName: string;
  dayOfWeek: number;
}

export class CustomDate {
  today: any;

  private static instance: CustomDate;

  constructor() {
    this.today = this.getDesc();
  }

  static getInstance(): CustomDate {
    if (CustomDate.instance == null) {
      CustomDate.instance = new CustomDate();
    }
    return CustomDate.instance;
  }

  todayDesc(): DescDate {
    return this.today;
  }

  getDesc(date = new Date()): DescDate {
    const monthNumber = date.getMonth();
    const monthName = MONTHS[monthNumber];
    const year = date.getFullYear();
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
    return { year, monthNumber, dayOfMonth, monthName, dayOfWeek };
  }

  getDescD(year, month, day = 1, hour = 1, min = 0, sec = 0): DescDate {
    return this.getDesc(this.newDate(year, month, day, hour, min, sec));
  }

  lastDayOf(y, m): number {
    const int_d = this.newDate(y, m + 1, 1, 2).getTime();
    const aDayMs = 1000 * 60 * 60 * 24;
    const lastDayOfMonth = this.newDateMillis(int_d - aDayMs).getDate();
    return lastDayOfMonth;
  }

  isToday(dayDesc): boolean {
    return (
      dayDesc.year == this.today.year &&
      dayDesc.monthNumber == this.today.monthNumber &&
      dayDesc.dayOfMonth == this.today.dayOfMonth
    );
  }

  beforeToday(dayDesc): boolean {
    return !(
      (dayDesc.year >= this.today.year &&
        dayDesc.monthNumber > this.today.monthNumber) ||
      (dayDesc.year == this.today.year &&
        dayDesc.monthNumber == this.today.monthNumber &&
        dayDesc.dayOfMonth >= this.today.dayOfMonth)
    );
  }

  newDate(year, month, day = 1, hour = 1, min = 0, sec = 0): Date {
    return new Date(year, month, day, hour, min, sec);
  }

  newDateMillis(millis): Date {
    return new Date(millis);
  }
}
