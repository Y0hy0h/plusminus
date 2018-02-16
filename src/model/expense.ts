export class Expense {
  constructor(
    public cents: number,
    public date: Date,
    public description?: string,
  ) {
  }
}
