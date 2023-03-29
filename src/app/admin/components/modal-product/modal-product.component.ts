import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoModelo } from 'src/app/productos/models/productos.modelo';
import { ProductosService } from 'src/app/productos/services/productos.service';
import {
  showNotifyError,
  showNotifySuccess,
} from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit {
  form!: FormGroup;
  id!: string;

  constructor(
    private matRef: MatDialogRef<ModalProductComponent>,
    private _ps: ProductosService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objProduct: ProductoModelo;
      isNew: boolean;
    }
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categorySex: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.data.objProduct) {
      this.id = this.data.objProduct._id.$oid;
      this.form.controls['title'].setValue(this.data.objProduct.title);
      this.form.controls['description'].setValue(
        this.data.objProduct.description
      );
      this.form.controls['categorySex'].setValue(
        this.data.objProduct.categorySex
      );
      this.form.controls['marca'].setValue(this.data.objProduct.marca);
      this.form.controls['precio'].setValue(this.data.objProduct.precio);
    }
  }

  submit() {
    this.data.isNew ? this.createProduct() : this.updateProduct();
    this.matRef.close(true);
  }

  updateProduct(): void {
    this._ps.updateProduct(this.id, this.form.getRawValue()).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Producto actualizado',
          'El producto fue actualizado correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al actualizar', 'Intente mas tarde');
      }
    );
  }

  createProduct(): void {
    this._ps.createProduct(this.form.getRawValue(), '').subscribe(
      (res: any) => {
        showNotifySuccess(
          'Producto creado',
          'El producto fue creado correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al crear categoría', 'Intente mas tarde');
      }
    );
  }
}
