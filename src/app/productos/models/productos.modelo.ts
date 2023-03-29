export interface CategoryModelo {
  _id: any;
  name: string;
  description: string;
  categorySex: string;
}

export interface ProductoModelo {
  _id: any;
  categoryID: string;
  title: string;
  description: string;
  categorySex: string;
  imageUrl: string;
  marca: string;
  precio: number;
  codigo: string;
}
