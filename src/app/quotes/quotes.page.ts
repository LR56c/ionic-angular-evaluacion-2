
import {
  CommonModule,
  Location
} from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import {
  arrowBackOutline
} from 'ionicons/icons'
import { NewQuoteComponent } from 'src/app/components/new-quote/new-quote.component'
import { QuotesListComponent } from 'src/app/components/quotes-list/quotes-list.component'

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    IonButtons, IonIcon, IonButton, NewQuoteComponent, QuotesListComponent,
    IonItemDivider ]
})
export class QuotesPage {

  constructor(private location : Location) {
    addIcons({
      arrowBackOutline
    })
  }

  public navigateBack(): void {
    this.location.back()
  }
}
