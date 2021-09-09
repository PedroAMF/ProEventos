import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  widthImg: number = 150;
  marginImg: number = 2;
  showImg: boolean = true;
  public eventosFilter: any = [];

  private _filterList: string = '';

  public get filterList(): string {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFilter = this.filterList
      ? this.filterEventos(this.filterList)
      : this.eventos;
  }

  filterEventos(filterfor: string): any {
    filterfor = filterfor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string, local: string }) =>
        {
          return evento.tema.toLocaleLowerCase().indexOf(filterfor) !== -1 ||
            evento.local.toLocaleLowerCase().indexOf(filterfor) !== -1;
        }
    )
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  changeImg() {
    this.showImg = !this.showImg;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosFilter = this.eventos;
      },
      error => console.log(error)
    );
  }
}
