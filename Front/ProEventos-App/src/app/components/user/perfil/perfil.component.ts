import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;
  constructor(public fb: FormBuilder) {}
  get f(): any {
    return this.form.controls;
  }
  ngOnInit() {
    this.validation();
  }
  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmeSenha'),
    };

    this.form = this.fb.group(
      {
        primeiroNome: ['', Validators.required],
        ultimoNome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        descricao: ['', Validators.minLength(8)],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmeSenha: ['', Validators.required],
      },
      formOptions
    );
  }
  public resetForm(): void {
    this.form.reset();
  }
  onSubmit(): void {
    if(this.form.invalid){
      return;
    }
  }
}
