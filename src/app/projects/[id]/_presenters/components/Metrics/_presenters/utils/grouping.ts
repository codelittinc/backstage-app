export function groupByFieldAndInterval(
  objects: any,
  dateField: string,
  interval: string,
  groupField: string | null
) {
  const grouped = {};

  objects.forEach((obj: any) => {
    let dateSegment;

    if (interval === "absolute") {
      dateSegment = "absolute";
    } else {
      switch (interval) {
        case "days":
          dateSegment = obj[dateField].substring(0, 10);
          break;
        case "weeks":
          const date = new Date(obj[dateField]);
          const day = date.getUTCDay();
          const difference = day === 0 ? 6 : day - 1;
          date.setUTCDate(date.getUTCDate() - difference);
          dateSegment = date.toISOString().substring(0, 10);
          break;
        case "months":
        default:
          dateSegment = obj[dateField].substring(0, 7);
          break;
      }
    }

    const key = groupField ? `${obj[groupField]}_${dateSegment}` : dateSegment;
    if (grouped[key]) {
      grouped[key].push(obj);
    } else {
      grouped[key] = [obj];
    }
  });

  const resultList = [];
  for (const [key, group] of Object.entries(grouped)) {
    const resultObj = { date: key, objects: group };

    if (groupField) {
      const [fieldValue, dateSegment] = key.split("_");
      resultObj[groupField] = fieldValue;
      resultObj.date = dateSegment;
    }

    resultList.push(resultObj);
  }

  return resultList;
}
