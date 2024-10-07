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
  IonToolbar,
  ViewWillEnter
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import {
  add,
  settingsOutline
} from 'ionicons/icons'
import { QuoteCardComponent } from 'src/app/components/quote-card/quote-card.component'
import { QuoteSkeletonComponent } from 'src/app/components/quote-skeleton/quote-skeleton.component'
import { Quote } from 'src/app/models/quote'
import { Configuration } from 'src/app/services/configuration/configuration'
import { ConfigurationService } from 'src/app/services/configuration/configuration.service'
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
export class HomePage implements OnInit, ViewWillEnter {
  constructor(
    private readonly quotesService: QuotesService,
    private configurationService: ConfigurationService
  )
  {
    addIcons( {
      settingsOutline,
      add
    } )
  }

  quote ?: Quote
  loaded: boolean                = false
  canDeleteInicialQuote: boolean = false

  async ionViewWillEnter(): Promise<void> {
    this.canDeleteInicialQuote = await this.configurationService.get<boolean>(
      Configuration.enum.DELETE_INITIAL_QUOTE ) ?? false
  }

  async ngOnInit(): Promise<void> {
    await this.loadQuote()
  }

  async loadQuote(): Promise<void> {
    this.loaded = false
    this.quote  = await this.quotesService.randomQuote()
    this.loaded = true
  }


  async onDelete( id: string ): Promise<void> {
    await this.quotesService.deleteQuote( id )
    await this.loadQuote()
  }
}
