import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface Oid {
  $oid: string;
}

interface CategoryMock {
  _id: Oid;
  name: string;
  description: string;
  categorySex: string;
  imageUrl: string;
}

interface InventarioMock {
  talla: string;
  inventario: number;
}

interface ProductMock {
  _id: Oid;
  categoryID: string;
  title: string;
  description: string;
  categorySex: string;
  imageUrl: string;
  inventario: InventarioMock[];
  precio: number;
  codigo: string;
}

interface UserMock {
  _id: Oid;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

interface DireccionMock {
  _id: Oid;
  clienteID: string;
  nombre: string;
  estado: string;
  municipio: string;
  colonia: string;
  calle: string;
  telefono: string;
  indicaciones: string;
}

interface ProductoVentaMock {
  productoID: string;
  categoryID: string;
  category: string;
  title: string;
  description: string;
  categorySex: string;
  imageUrl: string;
  talla: string;
  cantidad: number;
  existencia: number;
  precio: number;
  codigo: string;
  subtotal: number;
}

interface VentaMock {
  _id: Oid;
  fechaVenta: string;
  total: number;
  productos: ProductoVentaMock[];
  clienteID: string;
  nombreCliente: string;
  emailCliente: string;
  direccionEntrega: DireccionMock;
}

interface DumpRestoreMock {
  _id: Oid;
  date: string;
}

interface FeedbackMock {
  clienteID: string;
  preguntas: {
    experienciaNavegacion: string;
    recomendacion: string;
    variedadProductos: string;
  };
}

class MockDb {
  categories: CategoryMock[] = [
    {
      _id: { $oid: 'cat-man-1' },
      name: 'Camisas',
      description: 'Camisas formales y casuales para caballero',
      categorySex: 'man',
      imageUrl: 'sld1.png',
    },
    {
      _id: { $oid: 'cat-man-2' },
      name: 'Pantalones',
      description: 'Pantalones de vestir y casuales',
      categorySex: 'man',
      imageUrl: 'sld2.png',
    },
    {
      _id: { $oid: 'cat-man-3' },
      name: 'Sacos',
      description: 'Sacos y blazers con ajuste personalizado',
      categorySex: 'man',
      imageUrl: 'sld3.png',
    },
    {
      _id: { $oid: 'cat-woman-1' },
      name: 'Blusas',
      description: 'Blusas elegantes para dama',
      categorySex: 'woman',
      imageUrl: 'sld1.png',
    },
    {
      _id: { $oid: 'cat-woman-2' },
      name: 'Faldas',
      description: 'Faldas para toda ocasion',
      categorySex: 'woman',
      imageUrl: 'sld2.png',
    },
    {
      _id: { $oid: 'cat-woman-3' },
      name: 'Vestidos',
      description: 'Vestidos casuales y de fiesta',
      categorySex: 'woman',
      imageUrl: 'sld3.png',
    },
  ];

  products: ProductMock[] = [
    {
      _id: { $oid: 'prod-1' },
      categoryID: 'cat-man-1',
      title: 'Camisa Oxford Azul',
      description: 'Camisa de algodon con corte slim',
      categorySex: 'man',
      imageUrl: 'sld1.png',
      inventario: [
        { talla: 's', inventario: 4 },
        { talla: 'm', inventario: 8 },
        { talla: 'l', inventario: 6 },
      ],
      precio: 549,
      codigo: 'CAM-001',
    },
    {
      _id: { $oid: 'prod-2' },
      categoryID: 'cat-man-2',
      title: 'Pantalon Chino Beige',
      description: 'Pantalon comodo para uso diario',
      categorySex: 'man',
      imageUrl: 'sld2.png',
      inventario: [
        { talla: 'm', inventario: 5 },
        { talla: 'l', inventario: 5 },
        { talla: 'xl', inventario: 2 },
      ],
      precio: 699,
      codigo: 'PAN-002',
    },
    {
      _id: { $oid: 'prod-3' },
      categoryID: 'cat-woman-1',
      title: 'Blusa Satinada Marfil',
      description: 'Blusa elegante de manga larga',
      categorySex: 'woman',
      imageUrl: 'sld3.png',
      inventario: [
        { talla: 's', inventario: 7 },
        { talla: 'm', inventario: 4 },
        { talla: 'l', inventario: 3 },
      ],
      precio: 629,
      codigo: 'BLU-003',
    },
    {
      _id: { $oid: 'prod-4' },
      categoryID: 'cat-woman-3',
      title: 'Vestido Midi Floral',
      description: 'Vestido fresco para temporada calida',
      categorySex: 'woman',
      imageUrl: 'sld1.png',
      inventario: [
        { talla: 's', inventario: 6 },
        { talla: 'm', inventario: 6 },
        { talla: 'l', inventario: 2 },
      ],
      precio: 899,
      codigo: 'VES-004',
    },
  ];

  users: UserMock[] = [
    {
      _id: { $oid: 'usr-admin-1' },
      email: 'admin@bordados.com',
      name: 'Administrador',
      password: 'Admin1234',
      isAdmin: true,
    },
    {
      _id: { $oid: 'usr-client-1' },
      email: 'cliente@bordados.com',
      name: 'Cliente Demo',
      password: 'Cliente1234',
      isAdmin: false,
    },
  ];

  direcciones: DireccionMock[] = [
    {
      _id: { $oid: 'dir-1' },
      clienteID: 'usr-client-1',
      nombre: 'Casa',
      estado: 'Jalisco',
      municipio: 'Guadalajara',
      colonia: 'Centro',
      calle: 'Av. Juarez 100',
      telefono: '3312345678',
      indicaciones: 'Frente al parque',
    },
  ];

  sales: VentaMock[] = [];

  dumps: DumpRestoreMock[] = [
    { _id: { $oid: 'dump-1' }, date: new Date().toISOString() },
  ];

  restores: DumpRestoreMock[] = [];

  feedbacks: FeedbackMock[] = Array.from({ length: 30 }, (_, i) => {
    const experiencia = [
      'Muy fÃ¡cil y amigable',
      'FÃ¡cil',
      'Neutral',
      'DifÃ­cil',
      'Muy difÃ­cil',
    ];
    const recomendacion = [
      'Muy probable',
      'Probable',
      'Poco probable',
      'Nada probable',
    ];
    const variedad = [
      'Muy satisfecho',
      'Satisfecho',
      'Neutral',
      'Poco satisfecho',
      'Nada satisfecho',
    ];

    return {
      clienteID: i % 2 === 0 ? 'usr-client-1' : 'usr-client-2',
      preguntas: {
        experienciaNavegacion: experiencia[i % experiencia.length],
        recomendacion: recomendacion[(i + 1) % recomendacion.length],
        variedadProductos: variedad[(i + 2) % variedad.length],
      },
    };
  });
}

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  private db = new MockDb();

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!environment.useMockApi) {
      return next.handle(req);
    }

    const path = this.getPath(req.url);
    if (!this.isMockRoute(path, req.url)) {
      return next.handle(req);
    }

    const body = this.resolveRequest(req, path);
    return of(new HttpResponse({ status: 200, body })).pipe(delay(150));
  }

  private resolveRequest(req: HttpRequest<unknown>, path: string): unknown {
    const p = (key: string) => this.getParam(req, key);

    if (req.method === 'GET') {
      if (path.includes('/products/getCategoriesPerSex.php')) {
        const sex = p('categorySex');
        return this.clone(this.db.categories.filter((c) => c.categorySex === sex));
      }

      if (path.includes('/products/getCategories.php')) {
        return this.clone(this.db.categories);
      }

      if (path.includes('/products/createCategory.php')) {
        const newCategory: CategoryMock = {
          _id: { $oid: this.newId('cat') },
          name: p('name'),
          description: p('description'),
          categorySex: p('categorySex'),
          imageUrl: p('imageUrl') || 'sld1.png',
        };
        this.db.categories.push(newCategory);
        return { ok: true };
      }

      if (path.includes('/products/updateCategory.php')) {
        const id = p('id');
        const item = this.db.categories.find((c) => c._id.$oid === id);
        if (item) {
          item.name = p('name');
          item.description = p('description');
          item.categorySex = p('categorySex');
          item.imageUrl = p('imageUrl') || item.imageUrl;
        }
        return { ok: true };
      }

      if (path.includes('/products/deleteCategory.php')) {
        const id = p('id');
        this.db.categories = this.db.categories.filter((c) => c._id.$oid !== id);
        this.db.products = this.db.products.filter((prod) => prod.categoryID !== id);
        return { ok: true };
      }

      if (path.includes('/products/getCategory.php')) {
        const id = p('id');
        return this.clone(this.db.categories.filter((c) => c._id.$oid === id));
      }

      if (path.includes('/products/getProduct.php')) {
        const id = p('id');
        return this.clone(this.db.products.filter((prod) => prod._id.$oid === id));
      }

      if (path.includes('/products/getProducts.php')) {
        return this.clone(this.db.products);
      }

      if (path.includes('/products/createProduct.php')) {
        const inventario = this.parseJson<InventarioMock[]>(p('inventario'), []);
        const newProduct: ProductMock = {
          _id: { $oid: this.newId('prod') },
          title: p('title'),
          description: p('description'),
          categoryID: p('categoryID'),
          categorySex: p('categorySex'),
          precio: Number(p('precio') || 0),
          inventario,
          imageUrl: p('imageUrl') || 'sld1.png',
          codigo: `PRD-${Math.floor(Math.random() * 10000)}`,
        };
        this.db.products.push(newProduct);
        return { ok: true };
      }

      if (path.includes('/products/updateProduct.php')) {
        const id = p('id');
        const item = this.db.products.find((prod) => prod._id.$oid === id);
        if (item) {
          item.title = p('title');
          item.description = p('description');
          item.categoryID = p('categoryID');
          item.categorySex = p('categorySex');
          item.precio = Number(p('precio') || item.precio);
          item.inventario = this.parseJson<InventarioMock[]>(
            p('inventario'),
            item.inventario
          );
          item.imageUrl = p('imageUrl') || item.imageUrl;
        }
        return { ok: true };
      }

      if (path.includes('/products/deleteProduct.php')) {
        const id = p('id');
        this.db.products = this.db.products.filter((prod) => prod._id.$oid !== id);
        return { ok: true };
      }

      if (path.includes('/products/getProductsPerCategory.php')) {
        const id = p('id');
        return this.clone(this.db.products.filter((prod) => prod.categoryID === id));
      }

      if (path.includes('/products/findProduct.php')) {
        const txtSearch = (p('txtSearch') || '').toLowerCase();
        const categoryID = p('categoryID');
        const categorySex = p('categorySex');
        const talla = p('talla');
        const min = Number(p('min'));
        const max = Number(p('max'));

        let products = [...this.db.products];
        if (txtSearch && txtSearch !== '0') {
          products = products.filter(
            (prod) =>
              prod.title.toLowerCase().includes(txtSearch) ||
              prod.description.toLowerCase().includes(txtSearch)
          );
        }
        if (categoryID && categoryID !== '0') {
          products = products.filter((prod) => prod.categoryID === categoryID);
        }
        if (categorySex && categorySex !== '0') {
          products = products.filter((prod) => prod.categorySex === categorySex);
        }
        if (talla && talla !== '0') {
          products = products.filter((prod) =>
            prod.inventario.some((i) => i.talla === talla && i.inventario > 0)
          );
        }
        if (!Number.isNaN(min) && min >= 0) {
          products = products.filter((prod) => prod.precio >= min);
        }
        if (!Number.isNaN(max) && max >= 0) {
          products = products.filter((prod) => prod.precio <= max);
        }
        return this.clone(products);
      }

      if (path.includes('/users/read.php')) {
        return this.clone(this.db.users);
      }

      if (path.includes('/users/createClient.php')) {
        const newUser: UserMock = {
          _id: { $oid: this.newId('usr') },
          name: p('name'),
          email: p('email'),
          password: p('password'),
          isAdmin: p('isAdmin') === 'true',
        };
        this.db.users.push(newUser);
        return { ok: true };
      }

      if (path.includes('/users/updateClient.php')) {
        const id = p('id');
        const user = this.db.users.find((u) => u._id.$oid === id);
        if (user) {
          user.name = p('name');
          user.email = p('email');
          user.password = p('password');
          user.isAdmin = p('isAdmin') === 'true';
        }
        return { ok: true };
      }

      if (path.includes('/users/deleteClient.php')) {
        const id = p('id');
        this.db.users = this.db.users.filter((u) => u._id.$oid !== id);
        this.db.direcciones = this.db.direcciones.filter((d) => d.clienteID !== id);
        this.db.sales = this.db.sales.filter((s) => s.clienteID !== id);
        return { ok: true };
      }

      if (path.includes('/users/read_single.php')) {
        const email = (p('email') || '').toLowerCase();
        return this.clone(
          this.db.users.filter((u) => u.email.toLowerCase() === email)
        );
      }

      if (path.includes('/users/getUser.php')) {
        const id = p('id');
        return this.clone(this.db.users.filter((u) => u._id.$oid === id));
      }

      if (path.includes('/users/login.php')) {
        const email = (p('email') || '').toLowerCase();
        const password = p('password');
        return this.clone(
          this.db.users.filter(
            (u) => u.email.toLowerCase() === email && u.password === password
          )
        );
      }

      if (path.includes('/users/singupAll.php')) {
        const id = p('id');
        const user = this.db.users.find((u) => u._id.$oid === id);
        if (user) {
          user.name = p('name');
          user.password = p('password');
        }
        return { ok: true };
      }

      if (path.includes('/users/create.php')) {
        const email = p('email');
        const exists = this.db.users.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (!exists) {
          this.db.users.push({
            _id: { $oid: this.newId('usr') },
            email,
            name: '',
            password: '',
            isAdmin: false,
          });
        }
        return { ok: true };
      }

      if (path.includes('/users/update_password.php')) {
        const id = p('id');
        const user = this.db.users.find((u) => u._id.$oid === id);
        if (user) {
          user.password = p('password');
        }
        return { ok: true };
      }

      if (path.includes('/users/getFeedbacks.php')) {
        return this.clone(this.db.feedbacks);
      }

      if (path.includes('/sales/getDirecciones.php')) {
        const clienteID = p('clienteID');
        return this.clone(
          this.db.direcciones.filter((d) => d.clienteID === clienteID)
        );
      }

      if (path.includes('/sales/createDireccion.php')) {
        const dir: DireccionMock = {
          _id: { $oid: this.newId('dir') },
          clienteID: p('clienteID'),
          nombre: p('nombre'),
          estado: p('estado'),
          municipio: p('municipio'),
          colonia: p('colonia'),
          calle: p('calle'),
          telefono: p('telefono'),
          indicaciones: p('indicaciones'),
        };
        this.db.direcciones.push(dir);
        return { ok: true };
      }

      if (path.includes('/sales/updateDireccion.php')) {
        const id = p('id');
        const dir = this.db.direcciones.find((d) => d._id.$oid === id);
        if (dir) {
          dir.clienteID = p('clienteID');
          dir.nombre = p('nombre');
          dir.estado = p('estado');
          dir.municipio = p('municipio');
          dir.colonia = p('colonia');
          dir.calle = p('calle');
          dir.telefono = p('telefono');
          dir.indicaciones = p('indicaciones');
        }
        return { ok: true };
      }

      if (path.includes('/sales/deleteDireccion.php')) {
        const id = p('id');
        this.db.direcciones = this.db.direcciones.filter((d) => d._id.$oid !== id);
        return { ok: true };
      }

      if (path.includes('/sales/createSale.php')) {
        const productos = this.parseJson<ProductoVentaMock[]>(p('productos'), []);
        const direccionEntrega = this.parseJson<DireccionMock>(
          p('direccionEntrega'),
          {} as DireccionMock
        );
        const sale: VentaMock = {
          _id: { $oid: this.newId('sale') },
          fechaVenta: p('fechaVenta') || new Date().toISOString(),
          total: Number(p('total') || 0),
          productos,
          clienteID: p('clienteID'),
          nombreCliente: p('nombreCliente'),
          emailCliente: p('emailCliente'),
          direccionEntrega,
        };
        this.db.sales.push(sale);
        return { ok: true };
      }

      if (path.includes('/sales/getSales.php')) {
        const clienteID = p('clienteID');
        return this.clone(this.db.sales.filter((s) => s.clienteID === clienteID));
      }

      if (path.includes('/config/createBackup.php')) {
        return { ok: true };
      }

      if (path.includes('/config/restoreDB.php')) {
        return { ok: true };
      }

      if (path.includes('/mongotools/setDateDump.php')) {
        this.db.dumps.push({
          _id: { $oid: this.newId('dump') },
          date: new Date().toISOString(),
        });
        return { ok: true };
      }

      if (path.includes('/mongotools/setDateRestore.php')) {
        this.db.restores.push({
          _id: { $oid: this.newId('restore') },
          date: new Date().toISOString(),
        });
        return { ok: true };
      }

      if (path.includes('/mongotools/getDumps.php')) {
        return this.clone(this.db.dumps);
      }

      if (path.includes('/mongotools/getRestores.php')) {
        return this.clone(this.db.restores);
      }
    }

    if (req.method === 'POST') {
      if (path.includes('/products/uploadImage.php')) {
        return { ok: true };
      }

      if (req.url.includes(environment.urlEmail)) {
        return { ok: true };
      }
    }

    return { ok: true };
  }

  private isMockRoute(path: string, url: string): boolean {
    return (
      path.includes('/products/') ||
      path.includes('/users/') ||
      path.includes('/sales/') ||
      path.includes('/config/') ||
      path.includes('/mongotools/') ||
      url.includes(environment.urlEmail)
    );
  }

  private getPath(url: string): string {
    try {
      const parsed = new URL(url, 'http://localhost');
      return parsed.pathname;
    } catch {
      return url;
    }
  }

  private getParam(req: HttpRequest<unknown>, key: string): string {
    const direct = req.params.get(key);
    if (direct !== null) {
      return direct;
    }
    try {
      const parsed = new URL(req.urlWithParams, 'http://localhost');
      return parsed.searchParams.get(key) ?? '';
    } catch {
      return '';
    }
  }

  private newId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  private parseJson<T>(value: string, fallback: T): T {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
