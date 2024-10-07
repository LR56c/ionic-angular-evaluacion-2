import { Quote } from 'src/app/models/quote'

export abstract class QuotesRepository {

  abstract init(): Promise<void>
  abstract getQuotes(): Promise<Quote[]>
  abstract getQuote(id: string): Promise<Quote | undefined>
  abstract addQuote(quote: Quote): Promise<boolean>
  abstract updateQuote(quote: Quote): Promise<boolean>
  abstract deleteQuote(id: string): Promise<boolean>
}
