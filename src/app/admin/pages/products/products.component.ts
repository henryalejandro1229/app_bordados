import { Component, OnInit } from '@angular/core';
import { ProductoModelo } from 'src/app/productos/models/productos.modelo';
import { ModalProductComponent } from '../../components/modal-product/modal-product.component';
import { showNotifyError } from 'src/app/shared/functions/Utilities';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'categorySex',
    'marca',
    'precio',
    'options',
  ];
  objProducts!: ProductoModelo[];

  constructor(private _ps: ProductosService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.consultaInfo();
  }

  consultaInfo(): void {
    this._ps.getProducts().subscribe(
      (res: ProductoModelo[]) => {
        this.objProducts = res;
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  getTypeSex(type: string): string {
    return type === 'man' ? 'Caballero' : 'Dama';
  }

  openModal(isNew: boolean, producto?: ProductoModelo) {
    this.matDialog
      .open(ModalProductComponent, {
        panelClass: 'sinpadding',
        width: '500px',
        height: 'auto',
        data: {
          isNew,
          objCategory: producto,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res)
          this.consultaInfo();
      });
  }

}
