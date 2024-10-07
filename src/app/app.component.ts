import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit
} from '@angular/core'
import {
  IonApp,
  IonRouterOutlet
} from '@ionic/angular/standalone'
import { QuotesService } from 'src/app/services/quotes/quotes.service'

@Component( {
  selector   : 'app-root',
  templateUrl: 'app.component.html',
  standalone : true,
  imports    : [ IonApp, IonRouterOutlet ],
  schemas    : [ CUSTOM_ELEMENTS_SCHEMA ]
} )
export class AppComponent implements OnInit {
  constructor( private quoteService: QuotesService ) {}

  async ngOnInit(): Promise<void> {
    await this.quoteService.init()
  }
}
