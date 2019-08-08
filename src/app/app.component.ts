import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angst';

  // Graphs
  langDonut: [];
  timeSpentLine: [];
  editorPie: [];

  data;
  languages;
  timeInMinutes;
  editorData;
  editors;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.getStats('PatrikOlin').subscribe((res: any) => {
      this.data = res.data;
      this.languages = res.data.languages.map((lang) => lang.name);
      this.timeInMinutes = res.data.languages.map((lang) =>
        Math.floor(lang.total_seconds / 60)
      );
      this.editors = res.data.editors.map((editor) => editor.name);
      this.editorData = res.data.editors.map((editor) =>
        Math.floor(editor.total_seconds / 60)
      );
      this.drawAllCharts();
      console.log(this.data);
      console.log(this.languages);
    });
  }

  drawAllCharts() {
    this.drawLangDonut();
    this.drawEditorPie();
    //this.drawTimeSpentLine();
  }

  drawTimeSpentLine() {
    this.langDonut = new Chart('timeSpentLine', {
      type: 'line',
      data: {
        labels: this.languages,
        datasets: [
          {
            label: 'Minuter per språk',
            data: this.timeInMinutes,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  drawEditorPie() {
    this.editorPie = new Chart('editorPie', {
      type: 'pie',
      data: {
        labels: this.editors,
        datasets: [
          {
            label: 'Editors',
            data: this.editorData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  drawLangDonut() {
    this.langDonut = new Chart('langDonut', {
      type: 'polarArea',
      data: {
        labels: this.languages,
        datasets: [
          {
            label: 'Minuter per språk',
            data: this.timeInMinutes,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
