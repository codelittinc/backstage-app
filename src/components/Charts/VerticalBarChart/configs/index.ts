import typography from "@/assets/theme/base/typography";

const formatCurrency = (value: number) => {
  return `$${new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(value)}`;
};
function configs(
  labels: any,
  datasets: any,
  valueType: string,
  sufix: string,
  formatter: (value: number) => string,
  verticalStacked: boolean,
  horizontalStacked: boolean,
  labelColor: string,
  ignoreZero: boolean
) {
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,

          position: "bottom" as const,
        },
        datalabels: {
          enable: false,
          color: labelColor,
          anchor: "center",
          formatter: (value: number) => {
            if (ignoreZero && value === 0) {
              return "";
            }

            if (formatter) {
              return formatter(value);
            }

            if (valueType === "currency") {
              return formatCurrency(value);
            }

            return `${value.toFixed(1)} ${sufix}`;
          },
        },
      },
      scales: {
        y: {
          stacked: verticalStacked,
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#9ca2b7",
            font: {
              size: 11,
              family: typography.fontFamily,
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          stacked: horizontalStacked,
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: true,
            drawTicks: true,
          },
          ticks: {
            display: true,
            color: "#9ca2b7",
            padding: 10,
            font: {
              size: 11,
              family: typography.fontFamily,
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
