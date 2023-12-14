import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../modelos/Aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private url:string = 'http://localhost:3000/alunos';

  constructor(private http:HttpClient) {}

  selecionar():Observable<Aluno[]>{
      return this.http.get<Aluno[]>(this.url);
    }

  cadastrar(obj:Aluno):Observable<Aluno>{
    return this.http.post<Aluno>(this.url, obj);
  }

  remover(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
