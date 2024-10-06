import {
  CommonModule,
  NgClass,
  NgIf
} from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons'
import { Quote } from 'src/app/models/quote'
import {
  trashOutline
} from 'ionicons/icons'
@Component( {
  selector   : 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls  : [ './quote-card.component.scss' ],
  imports: [
    IonicModule,
    CommonModule,
  ],
  standalone : true
})
export class QuoteCardComponent  {

  @Input() highlight : boolean = false
  @Input() editable : boolean = false
  @Input() quote !: Quote
  @Output() deleteQuote = new EventEmitter<string>()

  constructor() {
    addIcons({
      trashOutline
    })
  }

  public onDelete(): void {
    this.deleteQuote.emit(this.quote.id)
  }
}
