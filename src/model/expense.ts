export class Expense {
  constructor(
    public cents: number,
    public description?: string,
    public date?: Date) {
  }
}
