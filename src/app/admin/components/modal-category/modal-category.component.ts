import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryModelo, ImagenModelo } from 'src/app/productos/models/productos.modelo';
import { ProductosService } from 'src/app/productos/services/productos.service';
import {
  showNotifyError,
  showNotifySuccess,
} from 'src/app/shared/functions/Utilities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss'],
})
export class ModalCategoryComponent implements OnInit {
  urlImage = environment.urlImg;
  imageName = '';
  form!: FormGroup;
  id!: string;
  objImagen: ImagenModelo = {
    nombreArchivo: '',
    base64textString: '',
  };

  constructor(
    private matRef: MatDialogRef<ModalCategoryComponent>,
    private _ps: ProductosService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objCategory: CategoryModelo;
      isNew: boolean;
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
    this._ps.updateCategory(this.id, this.form.getRawValue(), this.objImagen.nombreArchivo).subscribe(
      (res: any) => {
        showNotifySuccess(
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
    this._ps.createCategory(this.form.getRawValue(), this.objImagen.nombreArchivo).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Categoría creada',
          'La categoría fue creada correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al crear categoría', 'Intente mas tarde');
      }
    );
  }

  seleccionarImagen(event: any) {
    const files = event.target.files;
    const file = files[0];
    console.log(file);

    this.objImagen.nombreArchivo = file.name;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.objImagen.base64textString = btoa(binaryString);
  }

  uploadImage() {
    console.log(this.objImagen);
    this._ps.uploadFile(this.objImagen).subscribe(
      (datos) => {},
      (e) => {
        showNotifyError('Error al subir imagen', 'Intente mas tarde');
      }
    );
  }
}
