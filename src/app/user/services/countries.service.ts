import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { CountryData } from '../models/country-data';

interface ApiCountryData {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, string>;
  };
  cca3: string;
};

type DataTransformer = (countries: ApiCountryData[]) => CountryData[];

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private countries?: CountryData[];

  constructor(
    private http: HttpClient
  ) { }

  public getCountries(): Observable<CountryData[]> {
    return new Observable(observer => {
      if (this.countries) {
        observer.next(this.countries);
        return observer.complete();
      }

      this.http
        .get<ApiCountryData[]>(this.apiUrl)
        .pipe(
          map(this.getCountryDataTransformer())
        )
        .subscribe(countries => {
          this.countries = countries;
          observer.next(this.countries);
          observer.complete();
        });
    });
  }

  public getCountryName(code: string): Observable<string> {
    return new Observable(observer => {
      this.getCountries()
        .subscribe(countries => {
          const country = countries.find(country => country.code === code);
          observer.next(country?.name);
          observer.complete();
        });
    });
  }

  private getCountryDataTransformer(): DataTransformer {
    return countries => countries
      .map(country => {
        return {
          name: country.name.common,
          code: country.cca3
        }
      })
      .sort(
        (country1, country2) => country1.name
          .localeCompare(country2.name, 'en', { sensitivity: 'base' })
      );
  }
}
