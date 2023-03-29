import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryModelo } from 'src/app/productos/models/productos.modelo';
import { ProductosService } from 'src/app/productos/services/productos.service';
import {
  showNotifyError,
  showSwalSuccess,
} from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss'],
})
export class ModalCategoryComponent implements OnInit {
  form!: FormGroup;
  id!: string;

  constructor(
    private matRef: MatDialogRef<ModalCategoryComponent>,
    private _ps: ProductosService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objCategory: CategoryModelo;
      isNew: CategoryModelo;
    }
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categorySex: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.data.objCategory) {
      this.id = this.data.objCategory._id.$oid;
      this.form.controls['name'].setValue(this.data.objCategory.name);
      this.form.controls['description'].setValue(
        this.data.objCategory.description
      );
      this.form.controls['categorySex'].setValue(
        this.data.objCategory.categorySex
      );
    }
  }

  submit() {
    this.data.isNew ? this.createCategory() : this.updateCategory();
    this.matRef.close(true);
  }

  updateCategory(): void {
    this._ps.updateCategory(this.id, this.form.getRawValue()).subscribe(
      (res: any) => {
        showSwalSuccess(
          'Categoría actualizada',
          'La categoría fue actualizada correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al actualizar', 'Intente mas tarde');
      }
    );
  }

  createCategory(): void {
    this._ps.createCategory(this.form.getRawValue()).subscribe(
      (res: any) => {
        showSwalSuccess(
          'Categoría creada',
          'La categoría fue creada correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al crear categoría', 'Intente mas tarde');
      }
    );
  }
}
