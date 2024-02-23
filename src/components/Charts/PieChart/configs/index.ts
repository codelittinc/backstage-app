import colors from "@/assets/theme/base/colors";

const { gradients, dark } = colors;

function configs(labels: any, datasets: any, valueType: string, sufix: string) {
  const backgroundColors = [];

  if (datasets.backgroundColors) {
    datasets.backgroundColors.forEach((color: string) =>
      gradients[color]
        ? backgroundColors.push(gradients[color].state)
        : backgroundColors.push(dark.main)
    );
  } else {
    backgroundColors.push(dark.main);
  }

  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          weight: 9,
          cutout: 0,
          tension: 0.9,
          pointRadius: 2,
          borderWidth: 2,
          backgroundColor: backgroundColors,
          fill: false,
          data: datasets.data,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "right",
        },
        datalabels: {
          color: "white",
          anchor: "center",
          formatter: (value: number, context: any) => {
            if (value === 0) return "";
            if (valueType === "percentage") {
              return `${value.toFixed(1)}%`;
            }
            return `${value.toFixed(1)} ${sufix}`;
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let data = context.dataset.data,
                label = context.label,
                currentValue = context.raw,
                total = 0;

              for (let i = 0; i < data.length; i++) {
                total += data[i];
              }
              const percentage = parseFloat(
                ((currentValue / total) * 100).toFixed(1)
              );

              if (valueType === "percentage") {
                return `${label} - ${percentage}%`;
              }

              return `${label} - ${currentValue}`;
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  };
}

export default configs;
