import { Injectable } from '@angular/core'
import { BaseHttpService } from '@app/services/base-http.service'
import { Observable } from 'rxjs'
import { DataTableResponse, TableParams } from '@app-types/common.types'
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@app-types/category.types'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly endpoint: string

  constructor(
    private http: BaseHttpService,
  ) {
    this.endpoint = 'categories'
  }

  getCategories(params: Partial<TableParams>): Observable<DataTableResponse<Category>> {
    return this.http.get<DataTableResponse<Category>>(this.endpoint, params)
  }

  getCategoryById(id: string): Observable<Category | null> {
    return this.http.get<Category>(`${this.endpoint}/${id}`)
  }

  createCategory(data: CreateCategoryPayload): Observable<Category> {
    return this.http.post<CreateCategoryPayload, Category>(this.endpoint, data)
  }

  updateCategory(id: string | number, data: UpdateCategoryPayload): Observable<Category> {
    return this.http.put<CreateCategoryPayload, Category>(`${this.endpoint}/${id}`, data)
  }

  delete(id: string | number): Observable<boolean> {
    return this.http.delete<boolean>(this.endpoint, {
      id,
    })
  }
}
