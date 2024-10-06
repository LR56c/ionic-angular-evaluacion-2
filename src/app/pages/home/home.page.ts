import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import { RouterLink } from '@angular/router'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonRouterLink,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import {
  add,
  settingsOutline
} from 'ionicons/icons'
import { QuoteCardComponent } from 'src/app/components/quote-card/quote-card.component'
import { QuoteSkeletonComponent } from 'src/app/components/quote-skeleton/quote-skeleton.component'
import { Quote } from 'src/app/models/quote'
import { QuotesService } from 'src/app/services/quotes/quotes.service'

@Component( {
  selector   : 'app-home',
  templateUrl: 'home.page.html',
  styleUrls  : [ 'home.page.scss' ],
  standalone : true,
  imports    : [ IonHeader, IonToolbar, IonTitle, IonContent, CommonModule,
    IonButton, IonRouterLink, RouterLink, IonButtons, IonIcon, IonFab,
    IonFabButton, QuoteCardComponent, QuoteSkeletonComponent ]
} )
export class HomePage implements OnInit {
  constructor( private readonly quotesService: QuotesService ) {
    addIcons( {
      settingsOutline,
      add
    } )
  }

  quote ?: Quote
  loaded: boolean = false

  async ngOnInit(): Promise<void> {
    this.quote  = await this.quotesService.randomQuote()
    this.loaded = true
  }
}
