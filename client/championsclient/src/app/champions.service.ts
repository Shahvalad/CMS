import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Champion } from './champion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ChampionsService {

  constructor(private httpClient: HttpClient) { 
  }

  private apiServerUrl = 'http://localhost:8080/api/champions'

  public getChampions(): Observable<Champion[]>{
    return this.httpClient.get<Champion[]>(this.apiServerUrl)
  }

  public getChampion(id: number) : Observable<Champion>{
    return this.httpClient.get<Champion>(`${this.apiServerUrl}/${id}`)
  }

  public addChampion(champion: Champion) : Observable<Champion>{
    return this.httpClient.post<Champion>(`${this.apiServerUrl}`,champion)
  }

  public editChampion(id:number, champion:Champion): Observable<Champion>{
    return this.httpClient.put<Champion>(`${this.apiServerUrl}/${id}`,champion)
  }

  public deleteChampion(id:number): Observable<Champion>{
    return this.httpClient.delete<Champion>(`${this.apiServerUrl}/${id}`)
  }
  
}
