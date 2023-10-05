import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, delay, map, Observable, of, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Range } from '../models/app.model';
import { Course } from '../models/course.model';
import { Resort } from '../models/resort.model';

interface QueryParams {
    statiune: string;
    start: string;
    end: string;
    curs?: string;
    tip?: string;
    pret?: string;
    certificat?: string;
    view?: string;
}

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    apiPath: string = environment.BACKEND_URL;
    filterQueryParamsSubject: Subject<QueryParams> = new Subject();
    groupedCoursesSubject: BehaviorSubject<any> = new BehaviorSubject([]);
    flatCoursesSubject: BehaviorSubject<any> = new BehaviorSubject([]);
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public defaultView: 'groups' | 'flat' = 'flat';
    public bundleView: boolean = false;

    filterQueryParams: QueryParams = {
        statiune: null,
        start: null,
        end: null,
        curs: null,
        tip: null,
        pret: null,
        certificat: null,
        view: null,
    };

    length = null;
    page = 0;
    skip = 0;
    limit = 10;

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    setLoading(value: boolean): void {
        setTimeout(() => {
            this.loading$.next(value);
        }, 0);
    }

    setQueryParam(param, value = null, path?) {
        if (param) this.filterQueryParams[param] = value;
        if (path) {
            this.navigateQueryParams(path);
        } else {
            this.navigateQueryParams();
        }
    }

    setQueryParams(params) {
        for (const key in params) {
            this.filterQueryParams[key] = params[key];
        }
    }

    resetLocalQueryParams() {
        for (const key in this.filterQueryParams) {
            this.filterQueryParams[key] = null;
        }
    }

    emitLocalQueryParams() {
        this.filterQueryParamsSubject.next(this.filterQueryParams);
    }

    navigateQueryParams(path?) {
        this.router.navigate(path ? [path] : [], {
            relativeTo: this.route,
            queryParams: this.filterQueryParams,
            queryParamsHandling: 'merge',
            skipLocationChange: false
        });
    }

    resetPagination() {
        this.length = null;
        this.page = 0;
        this.skip = 0;
        this.limit = 10;
    }

    // get data for main filter
    getFilterData(): Observable<any> {
        return this.http.post(`${this.apiPath}/public/filter-data`, {
            statiune: this.filterQueryParams.statiune,
            start: this.filterQueryParams.start,
            end: this.filterQueryParams.end,
            curs: this.filterQueryParams.curs,
        }).pipe(
            map((result: any) => {
                return result;
            }),
            catchError((error) => {
                console.log(error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    // get selected resort object for main filter
    getResortData(resortUrl): Observable<Resort> {
        return this.http.get(`${this.apiPath}/public/selected-resort`, { params: { url: resortUrl } }).pipe(
            map((result: any) => {
                return result;
            }),
            catchError((error) => {
                console.log(error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    // get selected range object for main filter
    getRangeData(start, end): Observable<Range> {
        return this.http.get(`${this.apiPath}/public/selected-range`, { params: { start, end } }).pipe(
            map((result: any) => {
                return result;
            }),
            catchError((error) => {
                console.log(error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    // get selected course object for main filter
    getCourseData(courseUrl): Observable<Course> {
        return this.http.get(`${this.apiPath}/public/selected-course`, { params: { url: courseUrl } }).pipe(
            map((result: any) => {
                return result;
            }),
            catchError((error) => {
                console.log(error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    // get sessions based on current query filters
    getFilteredSessions(queryParams): Observable<any> {
        this.setLoading(true);
        let params = {
            ...queryParams,
            skip: this.skip,
            limit: this.limit
        };
        if (!params.view) params['view'] = this.defaultView;
        return this.http.post(`${this.apiPath}/public/courses`, params).pipe(
            map((result: any) => {
                this.setLoading(false);
                this.length = result.total;
                return result.courses;
            }),
            catchError((error) => {
                this.setLoading(false);
                console.log(error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    // HELPERS
    setBundleView(value) {
        this.bundleView = value;
        this.saveLocalData('bundle_view', value);
    }

    initBundleView() {
        let data = JSON.parse(localStorage.getItem('bundle_view'));
        this.setBundleView(data !== null ? data : false);
    }
    
    saveLocalData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

}