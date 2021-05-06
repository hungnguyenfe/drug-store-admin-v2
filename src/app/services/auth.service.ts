import { Injectable } from '@angular/core'
import { BaseHttpService } from '@app/services/base-http.service'
import { Account, LocalStorageData, LoginPayload, LoginResponse } from '@app-types/auth.types'
import { Observable, of, throwError } from 'rxjs'
import { TokenDecodedData } from '@app-types/common.types'
import jwtDecode from 'jwt-decode'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storeKey: string

  constructor(private readonly http: BaseHttpService) {
    this.storeKey = 'DrugStore'
  }

  public set localStoreData(data: LocalStorageData | null) {
    if (data) {
      localStorage.setItem(this.storeKey, JSON.stringify(data))
    } else {
      localStorage.removeItem(this.storeKey)
    }
  }

  public get localStoreData(): LocalStorageData | null {
    const dataStr = localStorage.getItem(this.storeKey)
    if (!dataStr) {
      return null
    }

    return JSON.parse(dataStr) as LocalStorageData
  }

  public decodeToken(token: string): TokenDecodedData | null {
    try {
      return jwtDecode(token)
    } catch {
      return null
    }
  }

  public buildAccountData(data: TokenDecodedData): Account {
    return {
      email: data?.email,
      username: data?.username,
    }
  }

  public isValidData(data: TokenDecodedData | null): boolean {
    if (!data?.exp) {
      return false
    }

    return data.exp * 1000 > Date.now()
  }

  public login(data: LoginPayload): Observable<LoginResponse> {
    const {username, password} = data
    if (username === 'admin' && password === 'hungnguyen123') {
      return of({
        token: 'this is token',
        workspaceId: 'this is workspace id',
      })
    } else {
      return throwError('Invalid username or password')
    }
    return this.http.get('login', data)
  }
}
