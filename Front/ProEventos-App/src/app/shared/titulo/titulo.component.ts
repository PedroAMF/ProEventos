import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss'],
})
export class TituloComponent implements OnInit {


  constructor(private router: Router) {}

  ngOnInit() {}


  @Input()
  tituloPrincipal!: string;
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo = 'Desde 2021';
  @Input() botaoListar = false;

  listar(): void {
    this.router.navigate([`/${this.tituloPrincipal.toLocaleLowerCase()}/lista`])
  }

}
