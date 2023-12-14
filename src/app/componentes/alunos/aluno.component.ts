import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlunoService } from '../../servicos/aluno.service';
import { Aluno } from '../../modelos/Aluno';


@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aluno.component.html',
  styleUrl: './aluno.component.css'
})

export class AlunoComponent {
  alunos:Aluno[] = []

  formulario = new FormGroup({
    nome: new FormControl(''),
    nota1: new FormControl(''),
    nota2: new FormControl('')
  })

  constructor(private servico:AlunoService){}

  ngOnInit(){
    this.servico.selecionar().subscribe(retorno => this.alunos = retorno)
  }

  cadastrar():void{
    this.servico.cadastrar(this.formulario.value as Aluno)
    .subscribe(aluno => {
      this.alunos.push(aluno)
      this.formulario.reset();
    });
  }

  remover(id:number):void{
    this.servico.remover(id).subscribe(r => {
      let posicaoAluno = this.alunos.findIndex(obj => {return obj.id === id});

      this.alunos.splice(posicaoAluno, 1)
    })
  }
}
