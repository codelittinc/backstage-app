function configs(labels: any, datasets: any) {
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      spanGaps: true,
      plugins: {
        datalabels: false,
        legend: {
          display: true,
          position: "right" as const,
          labels: {
            boxWidth: 2,
            boxHeight: 2,
            borderRadius: 1,
            useBorderRadius: true,
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "#c1c4ce5c",
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#9ca2b7",
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
            borderDash: [5, 5],
            color: "#c1c4ce5c",
          },
          ticks: {
            display: true,
            color: "#9ca2b7",
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  };
}

export default configs;
