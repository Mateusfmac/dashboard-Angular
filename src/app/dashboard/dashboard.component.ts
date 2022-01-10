import { Component, OnInit } from '@angular/core';
import { DadosService } from './dados.service';

// Tornando a variavel global
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public junho: string = ''
  public julho: string = ''
  public agosto: string = ''
  public setembro: string = ''

  private dados: any;

  constructor(private dadosService: DadosService) { }

  ngOnInit(): void {
    this.dadosService.obterDados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      }
    )
  }

  init(): void {
    if (typeof (google) !== "undefined") {
      google.charts.load('current', { 'packages': ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  exibirGraficos(): void {
    this.exibirPieChart();
    this.exibir3dPieChart();
    this.exibirDonutChart();
    this.exibirBarChart();
    this.exibirLineChart();
    this.exibirColumnChart();
  }

  // --------------GRAFICOS--------------

  exibirPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  exibir3dPieChart(): void {
    const el = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(el);

    const opcoes = this.obterOpcoes();

    opcoes['is3D'] = true;

    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirDonutChart(): void {
    const el = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(el);

    const opcoes = this.obterOpcoes();

    opcoes['pieHole'] = 0.4;

    chart.draw(this.obterDataTable(), opcoes);
  }

  exibirBarChart(): void {
    const el = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  exibirLineChart(): void {
    const el = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  exibirColumnChart(): void {
    const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  // --------------FIM GRAFICOS--------------

  pegarDados(): void {
    let junho = parseFloat(this.junho)
    let julho = parseFloat(this.julho)
    let agosto = parseFloat(this.agosto)
    let setembro = parseFloat(this.setembro)
    this.dadosService.pegaDados(junho, julho, agosto, setembro)
    this.dadosService.obterDados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      }
    )
  }



  obterDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'quantidade');
    data.addRows(this.dados);

    return data
  }

  obterOpcoes(): any {
    return {
      'title': "Quantidade de cadastro primeiro semestre",
      'width': 400,
      'height': 300
    };
  }
}