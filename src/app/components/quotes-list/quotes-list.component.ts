import {
  CommonModule,
  KeyValue
} from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import { QuoteCardComponent } from 'src/app/components/quote-card/quote-card.component'
import { Quote } from 'src/app/models/quote'
import { QuotesService } from 'src/app/services/quotes/quotes.service'

@Component( {
  selector   : 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls  : [ './quotes-list.component.scss' ],
  imports    : [
    QuoteCardComponent,
    CommonModule
  ],
  standalone : true
} )
export class QuotesListComponent implements OnInit {

  constructor( private readonly quotesService: QuotesService ) { }

  quotes: Quote[] = []

  async ngOnInit(): Promise<void> {
    this.quotesService.quotes$.subscribe( async (quotes) => {
      this.quotes = Array.from(quotes.values())
    })
  }

  async onDelete( id: string ): Promise<void> {
    await this.quotesService.deleteQuote( id )
  }

  // compareByQuoteDate( a: KeyValue<string, Quote>,
  //   b: KeyValue<string, Quote> ): number {
  //   return a.value.createdAt.getTime() - b.value.createdAt.getTime()
  // }
}
