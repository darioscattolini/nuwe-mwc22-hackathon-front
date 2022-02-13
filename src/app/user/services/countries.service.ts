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

/**
 * Builds Countries service
 */
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  /**
   * Url of RestCountries API
   */
  private apiUrl = 'https://restcountries.com/v3.1/all';
  
  /**
   * Retrieved countries list
   */
  private countries?: CountryData[];

  /**
   * Creates Countries service
   * @param {HttpClient} http - Http client dependency
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Gets full list of countries from API
   * @returns {CountryData[]} List of world countries with their respective
   * country code
   */
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

  /**
   * Gets country name corresponding to provided code
   * @param {string} code - Country code
   * @returns {string} Country name
   */
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

  /**
   * Returns function to transform country data from API
   * @returns {function} Function that transforms countries list obtained from
   * API
   */
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
