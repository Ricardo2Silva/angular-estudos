import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../infinite-scroll/pessoa.model';




@Injectable({providedIn: 'root'})
export class PeopleService {

  constructor(private http: HttpClient){}

  getPessoas(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>('http://localhost:3030/pessoas');
  }
}
