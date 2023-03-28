export interface ClienteModelo {
  _id: any;
  name?: string;
  description?: string;
  categorySex?: string;
}

export interface ProductoModelo {
  categoryID: string;
  title: string;
  description: string;
  categorySex: string;
  imageUrl: string;
  marca: string;
  precio: number;
  codigo: string;
}
