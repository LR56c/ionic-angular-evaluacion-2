import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'
import {
  configurations,
  ConfigurationType
} from 'src/app/services/configuration/configuration'

// await Preferences.set({
//   key: "ORDENAR_ALFABETICAMENTE",
//   value: "true"
// })

// const deboOrdenar = await Preferences.get({
//   key: "ORDENAR_ALFABETICAMENTE"
// })
@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  configMap = new Set<string>(configurations)

  async set(key: ConfigurationType, value: string): Promise<boolean> {
    if(!this.configMap.has(key)) return false
    await Preferences.set({ key, value })
    return true
  }

  async get<T>(key: ConfigurationType): Promise<T | null> {
    if(!this.configMap.has(key)) return null
    const recover = await Preferences.get({ key })
    return recover.value as T | null
  }
}
