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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
