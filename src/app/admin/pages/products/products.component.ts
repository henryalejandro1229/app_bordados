import { Component, OnInit } from '@angular/core';
import { CategoryModelo, ProductoModelo } from 'src/app/productos/models/productos.modelo';
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
    'categoria',
    'categorySex',
    'marca',
    'precio',
    'options',
  ];
  objProducts!: ProductoModelo[];
  objCategories!: CategoryModelo[];

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
    this._ps.getCategories().subscribe(
      (res: CategoryModelo[]) => {
        this.objCategories = res;
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  getTypeSex(type: string): string {
    return type === 'man' ? 'Caballero' : 'Dama';
  }

  getCategoria(id: string): string {
    if(this.objCategories && this.objCategories.length > 0){
      let category = this.objCategories.find(cat => cat._id.$oid === id);
      return category? category.name : '';
    }
    return '';
  }

  openModal(isNew: boolean, producto?: ProductoModelo) {
    this.matDialog
      .open(ModalProductComponent, {
        panelClass: 'sinpadding',
        width: '600px',
        height: 'auto',
        data: {
          isNew,
          objProduct: producto,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res)
          this.consultaInfo();
      });
  }

  deleteProduct() {
    
  }

}
