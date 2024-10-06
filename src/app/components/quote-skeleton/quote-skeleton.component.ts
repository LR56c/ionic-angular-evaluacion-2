import { NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'

@Component( {
  selector   : 'app-quote-skeleton',
  templateUrl: './quote-skeleton.component.html',
  styleUrls  : [ './quote-skeleton.component.scss' ],
  imports: [
    IonicModule,
    NgIf
  ],
  standalone : true
})
export class QuoteSkeletonComponent {

  constructor() { }
}
