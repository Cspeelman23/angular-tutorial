import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application.json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public heroesUrl = 'api/heroes';  // URL to web api :base/:collectionName
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

    /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes', [])),
      tap(_ => this.log('fetched heroes'))
    ); // of and http.get both return Observable<watcher>
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`))// ,
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    /*.put takes 3 params: the URL,the data to update-the modified hero in this case, options*/
    return this.http.put(this.heroesUrl, hero, httpOptions) // heroes web API expects a special header in HTTP save requests
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}, name is now "${hero.name}"`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id= ${newHero.id} and name "${newHero.name}"`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) { // trim= remove the white spaces from both the ends of the given string
    // if no search entered, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeros', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
