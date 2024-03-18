import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, map } from "rxjs";
import { Celebrity } from "src/app/shared/interfaces/celebrity.interfaces";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CelebrityService {

    private _baseUrl = '';

    constructor(private readonly _http: HttpClient) {
        this._baseUrl = environment.baseUrl;
    }

    private celebrities_list: Celebrity[] = [
        {
            id: "nm0000701",
            name: "Ian McKellen",
            birthYear: 1939,
            deathYear: 0,
        },
        {
            id: "nm0000008",
            name: "Marlon Brando",
            birthYear: 1924,
            deathYear: 2004,
        },
        {
            id: "nm0000158",
            name: "Tom Hanks",
            birthYear: 1956,
            deathYear: 0,
        },
        {
            id: "nm0000704",
            name: "Elijah Wood",
            birthYear: 1981,
            deathYear: 0,
        },
        {
            id: "nm0000199",
            name: "Al Pacino",
            birthYear: 1940,
            deathYear: 0,
        },
        {
            id: "nm0000705",
            name: "Robin Wright",
            birthYear: 1966,
            deathYear: 0,
        },
        {
            id: "nm0000237",
            name: "John Travolta",
            birthYear: 1954,
            deathYear: 0,
        },
        {
            id: "nm0000235",
            name: "Uma Thurman",
            birthYear: 1970,
            deathYear: 0,
        },
        {
            id: "nm0000434",
            name: "Mark Hamill",
            birthYear: 1951,
            deathYear: 0,
        },
        {
            id: "nm0000148",
            name: "Harrison Ford",
            birthYear: 1942,
            deathYear: 0,
        },
    ];

    private celebrityList = new Subject<Celebrity[]>();

    CelebrityListObs = this.celebrityList.asObservable();

    getList(): Observable<Celebrity[]> {
        return this._http.get<Celebrity[]>(`${this._baseUrl}/celebrities?order_by=id&page=0&size=25`).pipe(
            map(
                (result: any) => {
                    return result.celebrities;
                }
            )
        );
    }

    getById(id: string): Observable<Celebrity> {
        return this._http.get<Celebrity>(`${this._baseUrl}/celebrities/${id}`)
    }

    update(updatedCelebrity: Celebrity): Observable<Celebrity> {
        return this._http.put<Celebrity>(`${this._baseUrl}/celebrities/${updatedCelebrity.id}`, updatedCelebrity);
    }

    private _numId = this.celebrities_list.length;

    create(createdCelebrity: Celebrity): Observable<Celebrity> {
        const newId = `nm${(this._numId + 1).toString().padStart(7, '0')}`;
        this._numId += 1;
        const newCelebrity: Celebrity = {
            id: newId,
            name: createdCelebrity.name,
            birthYear: createdCelebrity.birthYear,
            deathYear: createdCelebrity.deathYear
        }

        return this._http.post<Celebrity>(`${this._baseUrl}/celebrities`, newCelebrity);
    }

    delete(id: string): Observable<Celebrity> {
        return this._http.delete<Celebrity>(`${this._baseUrl}/celebrities/${id}`);
    }
}