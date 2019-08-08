import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'wakapy-front';
  chart: [];
  data;
  languages;
  timeInMinutes;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('http://localhost:5000/stats/PatrikOlin')
      .subscribe((res: any) => {
        this.data = res.data;
        this.languages = res.data.languages.map((lang) => lang.name);
        this.timeInMinutes = res.data.languages.map((lang) =>
          Math.floor(lang.total_seconds / 60)
        );
        this.drawChart();
        console.log(this.data);
        console.log(this.languages);
      });
  }

  drawChart() {
    this.chart = new Chart('graph1', {
      type: 'doughnut',
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
