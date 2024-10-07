import {
  CommonModule,
  Location
} from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { arrowBackOutline } from 'ionicons/icons'
import { ConfigurationService } from 'src/app/services/configuration/configuration.service'

@Component( {
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: [ './configuration.page.scss' ],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule,
    IonToggle, IonIcon ]
} )
export class ConfigurationPage implements OnInit {

  constructor(
    private location: Location,
    private configurationService: ConfigurationService )
  {
    addIcons( {
      arrowBackOutline
    } )
  }

  async ngOnInit(): Promise<void> {
    this.canDeleteInicialQuote = await this.configurationService.get<boolean>( 'DELETE_INITIAL_QUOTE' ) ?? false
  }

  canDeleteInicialQuote: boolean = false


  public navigateBack(): void {
    this.location.back()
  }

  async onChange( $event: CustomEvent ): Promise<void> {
    const value = $event.detail.checked
    await this.configurationService.set( 'DELETE_INITIAL_QUOTE', value.toString() )
  }
}
