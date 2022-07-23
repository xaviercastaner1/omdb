import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from './api-constants';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { 

  }

  getMovies(title: string) {
    return this.http.get(`${ApiConstants.baseUrl}s=${title}`)
  }

  getMovie(id: string) {
    return this.http.get(`${ApiConstants.baseUrl}i=${id}`)
  }
}
