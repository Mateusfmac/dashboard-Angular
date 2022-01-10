import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dados } from '.';



@Injectable()
export class DadosService {
  
  
  /* teste(teste: Dados): void {
   let jun = teste.junho
   console.log(jun)
   
  } */


  public dados = [
    ['Junho', 1],
    ['Julho', 1],
    ['Agosto', 1],
    ['Setembro', 1]
  ]



  

  pegaDados(junho: number, julho: number, agosto: number, setembro: number): void {
    this.dados[0][1] = junho
    this.dados[1][1] = julho
    this.dados[2][1] = agosto
    this.dados[3][1] = setembro
  }


  constructor() { }

  obterDados(): Observable<any> {
    return new Observable(observable => {
      observable.next(this.dados)
      observable.complete()
    })
  }
}
