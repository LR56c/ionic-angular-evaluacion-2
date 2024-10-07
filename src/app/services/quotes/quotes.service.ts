import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Quote } from 'src/app/models/quote'
import { QuotesRepository } from 'src/app/services/quotes/quotes-repository'
import { QuotesSqliteData } from 'src/app/services/quotes/quotes-sqlite-data'
import { quoteMapper } from 'src/app/utils/quote-mapper'
import { decodeTime } from 'ulidx'

@Injectable( {
  providedIn: 'root'
} )
export class QuotesService {

  repository: QuotesRepository = new QuotesSqliteData()

  constructor() {
  }

  async init(): Promise<void> {
    await this.repository.init()
    await this.seedQuotes()
  }

  private _quotes: Map<string, Quote>                        = new Map()
  private quotesSubject: BehaviorSubject<Map<string, Quote>> = new BehaviorSubject(
    this._quotes )
  quotes$                                                    = this.quotesSubject.asObservable()

  async seedQuotes(): Promise<void> {
    const id1 = '01J9J7XRM22TYP9CT2WJC0XB8P'
    const id2 = '01J9J7XRMDZ6J9C0FEBN41G5N6'
    await this.repository.deleteQuote( id1 )
    await this.repository.deleteQuote( id2 )
    await this.repository.addQuote( {
      id       : id1,
      text     : 'Success usually comes to those who are too busy to be looking for it.',
      author   : 'Henry David Thoreau',
      createdAt: new Date( decodeTime( id1 ) )
    } )
    await this.repository.addQuote( {
      id       : id2,
      text     : 'We are all like fireworks: we climb, we shine and always go our separate ways and become further apart. But even when that time comes, let’s not disappear like a firework and continue to shine.. forever.',
      author   : 'Hitsugaya Toshiro',
      createdAt: new Date( decodeTime( id2 ) )
    } )
    await this.getQuotes()
  }

  private async getQuotes(): Promise<void> {
    const quotes        = await this.repository.getQuotes()
    const orderedQuotes = quotes.sort( ( a, b ) => a.createdAt.getTime() - b.createdAt.getTime() )
    this._quotes        = new Map( orderedQuotes.map( quote => [ quote.id, quote ] ) )
    this.quotesSubject.next( this._quotes )
  }

  async addQuote( quote: Quote ): Promise<void> {
    const result = await this.repository.addQuote( quote )
    if ( result ) {
      this._quotes.set( quote.id, quote )
      this.quotesSubject.next( this._quotes )
    }
  }

  async deleteQuote( id: string ): Promise<void> {
    const result = await this.repository.deleteQuote( id )
    if ( result ) {
      this._quotes.delete( id )
      this.quotesSubject.next( this._quotes )
    }
  }

  async getQuote( id: string ): Promise<Quote | undefined> {
    // return this.repository.getQuote( id )
    return this._quotes.get( id )
  }

  async updateQuote( quote: Quote ): Promise<void> {
    const result = await this.repository.updateQuote( quote )
    if ( result ) {
      this._quotes.set( quote.id, quote )
      this.quotesSubject.next( this._quotes )
    }
  }

  async randomQuote(): Promise<Quote> {
    const response = await fetch( 'https://quotes-api-self.vercel.app/quote' )
    const quote    = quoteMapper( await response.json() )
    await this.addQuote( quote )
    return quote
  }


}
