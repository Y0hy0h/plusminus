import { autoserialize, autoserializeAs } from 'cerialize'

export class Expense {
  @autoserialize public cents: number
  @autoserializeAs(Date) public date: Date
  @autoserialize public description?: string

  constructor(
    cents: number,
    date: Date,
    description?: string,
  ) {
    this.cents = cents
    this.date = date
    this.description = description
  }
}
