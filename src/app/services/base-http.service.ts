import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@app-environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  private readonly baseURL: string

  constructor(
    private http: HttpClient,
  ) {
    this.baseURL = environment.baseUrl
  }

  public get<K>(path: string, params: any): Observable<K> {
    return this.http.get<K>(`${this.baseURL}/${path}`, {
      params,
    })
  }

  public post<T, K>(path: string, data: T): Observable<K> {
    return this.http.post<K>(`${this.baseURL}/${path}`, data)
  }

  public patch<T, K>(path: string, data: T): Observable<K> {
    return this.http.patch<K>(`${this.baseURL}/${path}`, data)
  }

  public put<T, K>(path: string, data: T): Observable<K> {
    return this.http.put<K>(`${this.baseURL}/${path}`, data)
  }

  public delete<K = boolean>(path: string, params: any): Observable<K> {
    return this.http.delete<K>(`${this.baseURL}/${path}`, {
      params,
    })
  }
}
