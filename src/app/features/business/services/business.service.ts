import { Injectable, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { Business } from '../models/business.model';
import { Province } from '../models/province.model';

const BUSINESSES_KEY = makeStateKey<Business[]>('businesses-data');
const PROVINCES_KEY = makeStateKey<Province[]>('provinces-data');

@Injectable({ providedIn: 'root' })
export class BusinessService {
  constructor(
    private api: ApiService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getBusinesses(): Observable<Business[]> {
    if (!isPlatformServer(this.platformId) && this.transferState.hasKey(BUSINESSES_KEY)) {
      const data = this.transferState.get(BUSINESSES_KEY, [] as Business[]);
      this.transferState.remove(BUSINESSES_KEY);
      return of(data);
    }

    return this.api.get<Business[]>('Business').pipe(
      tap(data => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(BUSINESSES_KEY, data);
        }
      }),
      catchError(err => {
        console.error('API error:', err);
        return of([]);
      })
    );
  }

  getProvinces(): Observable<Province[]> {
    if (!isPlatformServer(this.platformId) && this.transferState.hasKey(PROVINCES_KEY)) {
      const data = this.transferState.get(PROVINCES_KEY, [] as Province[]);
      this.transferState.remove(PROVINCES_KEY);
      return of(data);
    }

    return this.api.get<Province[]>('Locations/all-with-cities').pipe(
      tap(data => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(PROVINCES_KEY, data);
        }
      }),
      catchError(err => {
        console.error('API error:', err);
        return of([]);
      })
    );
  }
}
