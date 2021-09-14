import { Component, OnInit } from '@angular/core';

//import { EventoService } from '../services/evento.service';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/services/evento.service';



@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventoService]
})
export class EventosComponent implements OnInit {
  public eventos: Evento[] = [];
  widthImg: number = 150;
  marginImg: number = 2;
  showImg: boolean = true;
  public eventosFilter: Evento[] = [];

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

  public filterEventos(filterfor: string): Evento[] {
    filterfor = filterfor.toLocaleLowerCase();
    return this.eventos.filter((evento: { tema: string; local: string }) => {
      return (
        evento.tema.toLocaleLowerCase().indexOf(filterfor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filterfor) !== -1
      );
    });
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  //Confirm Windows initial

  modalRef?: BsModalRef;

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Evento apagado com sucesso!');
  }

  decline(): void {
    this.modalRef?.hide();
  }

  //Confirm Windows END

  public ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    this.getEventos();
  }

  public changeImg(): void {
    this.showImg = !this.showImg;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFilter = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Error');
      },
      complete: () => this.spinner.hide(),
    });
  }
}
