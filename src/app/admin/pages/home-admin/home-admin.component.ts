import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { LoginService } from 'src/app/login/services/login.service';
import { showNotifyError } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  chartExperienciaNav: any;
  chartRecomendacion: any;
  chartVariedadProds: any;
  feedbacks: Feedback[] = [];
  experienciaNavegacion: string[] = [];
  experienciaNavegacionAgrupada: { [key: string]: number } = {
    'Muy fácil y amigable': 30,
    Fácil: 40,
    Neutral: 20,
    Difícil: 50,
    'Muy difícil': 60,
  };
  recomendacion: string[] = [];
  recomendacionAgrupada: { [key: string]: number } = {
    'Muy probable': 15,
    'Poco probable': 62,
    Probable: 55,
    'Nada probable': 4,
  };
  variedadProductos: string[] = [];
  variedadProductosAgrupada: { [key: string]: number } = {
    'Muy satisfecho': 52,
    Satisfecho: 16,
    Neutral: 25,
    'Poco satisfecho': 32,
    'Nada satisfecho': 42,
  };

  constructor(private readonly _ls: LoginService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  private agruparCadenasRepetidas(
    arr: string[],
    obj: { [key: string]: number }
  ) {
    arr.forEach((cadena) => (obj[cadena] += 1));
  }

  public getFeedbacks() {
    return this._ls.getFeedbacks().subscribe(
      (res) => {
        this.feedbacks = res;
        this.feedbacks.forEach((feedback) => {
          this.experienciaNavegacion.push(
            feedback.preguntas.experienciaNavegacion
          );
          this.recomendacion.push(feedback.preguntas.recomendacion);
          this.variedadProductos.push(feedback.preguntas.variedadProductos);
        });
        this.agruparCadenasRepetidas(
          this.experienciaNavegacion,
          this.experienciaNavegacionAgrupada
        );
        this.agruparCadenasRepetidas(
          this.recomendacion,
          this.recomendacionAgrupada
        );
        this.agruparCadenasRepetidas(
          this.variedadProductos,
          this.variedadProductosAgrupada
        );
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  createChartExperienciaNav() {
    const ctx = document.getElementById(
      'myChartExperienciaNav'
    ) as HTMLCanvasElement;
    this.chartExperienciaNav = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Muy fácil y amigable',
          'Fácil',
          'Neutral',
          'Difícil',
          'Muy difícil',
        ],
        datasets: [
          {
            label: 'Sample Data',
            data: [
              this.experienciaNavegacionAgrupada['Muy fácil y amigable'],
              this.experienciaNavegacionAgrupada['Fácil'],
              this.experienciaNavegacionAgrupada['Neutral'],
              this.experienciaNavegacionAgrupada['Difícil'],
              this.experienciaNavegacionAgrupada['Muy difícil'],
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  createChartRecomendacion() {
    const ctx = document.getElementById(
      'myChartRecomendacion'
    ) as HTMLCanvasElement;
    this.chartExperienciaNav = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Muy probable', 'Poco probable', 'Probable', 'Nada probable'],
        datasets: [
          {
            label: 'Sample Data',
            data: [
              this.recomendacionAgrupada['Muy probable'],
              this.recomendacionAgrupada['Poco probable'],
              this.recomendacionAgrupada['Probable'],
              this.recomendacionAgrupada['Nada probable'],
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  createChartVariedadProds() {
    const ctx = document.getElementById(
      'myChartVariedadProds'
    ) as HTMLCanvasElement;
    this.chartExperienciaNav = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Muy satisfecho',
          'Satisfecho',
          'Neutral',
          'Poco satisfecho',
          'Nada satisfecho',
        ],
        datasets: [
          {
            label: 'Sample Data',
            data: [
              this.variedadProductosAgrupada['Muy satisfecho'],
              this.variedadProductosAgrupada['Satisfecho'],
              this.variedadProductosAgrupada['Neutral'],
              this.variedadProductosAgrupada['Poco satisfecho'],
              this.variedadProductosAgrupada['Nada satisfecho'],
            ],
            // borderWidth: 1,
          },
        ],
      },
    });
  }
}

export interface Feedback {
  clienteID: string;
  preguntas: Preguntas;
}

export interface Preguntas {
  experienciaNavegacion: string;
  recomendacion: string;
  variedadProductos: string;
}
