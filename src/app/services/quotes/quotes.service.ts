import { Injectable } from '@angular/core'
import {
  Observable,
  of
} from 'rxjs'
import { Quote } from 'src/app/models/quote'
import { quoteMapper } from 'src/app/utils/quote-mapper'

@Injectable( {
  providedIn: 'root'
} )
export class QuotesService {

  constructor() { }

  _quotes: Map<string, Quote> = new Map( [
    [ '01J9FRPHVGJBFXE9HWE754KGSG', {
      id    : '01J9FRPHVGJBFXE9HWE754KGSG',
      text  : 'The only way to get smarter is by playing a smarter opponent.',
      author: 'Fundamentals of Chess, 1883',
      createdAt: new Date()
    } ]
  ] )

  get quotes(): Observable<Map<string, Quote>> {
    return of( this._quotes )
  }

  addQuote( quote: Quote ): void {
    this._quotes.set( quote.id, quote )
  }

  deleteQuote( id: string ): void {
    this._quotes.delete( id )
  }

  async randomQuote(): Promise<Quote> {
    const response = await fetch( 'https://quotes-api-self.vercel.app/quote' )
    const quote    = quoteMapper( await response.json() )
    this._quotes.set( quote.id, quote )
    return quote
  }


}
