export class DateTime {
  private readonly value: Date;

  constructor(input: string | Date) {
    const date = this.parseInput(input);

    if (isNaN(date.getTime())) {
      throw new Error(`Data inválida: ${input}`);
    }

    this.value = new Date(date.getTime());
  }


  private parseInput(input: string | Date): Date {
    if (input instanceof Date) {
      return new Date(input.getTime());
    }

    if (typeof input === "string") {
      // Suporta TIMESTAMP PostgreSQL: "2025-12-01 10:20:55"
      if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(input)) {
        return new Date(input.replace(" ", "T") + "Z");
      }

      // Suporta ISO nativo
      return new Date(input);
    }

    throw new Error("Tipo inválido para DateTime");
  }


  toDate(): Date {
    return new Date(this.value.getTime());
  }

  toTimestamp(): string {
    const pad = (n: number) => String(n).padStart(2, "0");

    const y = this.value.getUTCFullYear();
    const m = pad(this.value.getUTCMonth() + 1);
    const d = pad(this.value.getUTCDate());
    const hh = pad(this.value.getUTCHours());
    const mm = pad(this.value.getUTCMinutes());
    const ss = pad(this.value.getUTCSeconds());

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }

  toISO(): string {
    return this.value.toISOString();
  }

  equals(other: DateTime): boolean {
    return this.value.getTime() === other.value.getTime();
  }

  isPresent(): boolean {
    return this.value.getTime() == Date.now();
  }

  isFuture(): boolean {
    return this.value.getTime() > Date.now();
  }

  isPast(): boolean {
    return this.value.getTime() < Date.now();
  }
}
