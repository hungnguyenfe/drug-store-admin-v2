import { createFeatureSelector } from '@ngrx/store'
import { CORE_KEY } from '@app-store/core/core.reducer'

export const coreStateSelector = createFeatureSelector(CORE_KEY)
