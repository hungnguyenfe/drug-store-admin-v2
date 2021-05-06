import { Injectable } from '@angular/core'
import { BaseHttpService } from '@app/services/base-http.service'
import { Observable } from 'rxjs'
import { DataTableResponse, TableParams } from '@app-types/common.types'
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@app-types/category.types'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(
    private http: BaseHttpService,
  ) {
  }

  getCategories(params: Partial<TableParams>): Observable<DataTableResponse<Category>> {
    return this.http.get<DataTableResponse<Category>>('category', params)
  }

  createCategory(data: CreateCategoryPayload): Observable<Category> {
    return this.http.post<CreateCategoryPayload, Category>('category', data)
  }

  updateCategory(id: string | number, data: UpdateCategoryPayload): Observable<Category> {
    return this.http.put<CreateCategoryPayload, Category>('category', data)
  }

  delete(id: string | number): Observable<boolean> {
    return this.http.delete<boolean>('category', {
      id,
    })
  }
}
