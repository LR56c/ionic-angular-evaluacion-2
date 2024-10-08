import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { QuotesService } from 'src/app/services/quotes/quotes.service'
import { quoteMapper } from 'src/app/utils/quote-mapper'

@Component( {
  selector   : 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls  : [ './new-quote.component.scss' ],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone : true
})
export class NewQuoteComponent  {

  constructor(private readonly quotesService : QuotesService) { }

  quoteForm = new FormGroup( {
    quote: new FormControl('', [Validators.required, Validators.minLength(5)]),
    author : new FormControl('', [Validators.required, Validators.minLength(2)]),
  })

  async addQuote(): Promise<void> {
    if(!this.quoteForm.valid){
      this.quoteForm.markAllAsTouched()
      return
    }
    const quote = quoteMapper(this.quoteForm.value)
    await this.quotesService.addQuote(quote)
    this.quoteForm.reset()
  }
}
