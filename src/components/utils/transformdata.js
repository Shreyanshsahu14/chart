export const transformData = (option, data) => {
    if (!option || !data.length) return { labels: [], datasets: [] };
  
    const valueCounts = {};
  
    data.forEach((item) => {
      const keyValue = item[option];
  
      if (Array.isArray(keyValue)) {
        keyValue.forEach((element) => {
          const value = element[`${option.slice(0, -1)}Name`] || element;
          valueCounts[value] = (valueCounts[value] || 0) + 1;
        });
      } else if (typeof keyValue === "string") {
        valueCounts[keyValue] = (valueCounts[keyValue] || 0) + 1;
      } else if (typeof keyValue === "number") {
        valueCounts["Total"] = (valueCounts["Total"] || 0) + keyValue;
      }
    });
  
    const labels = Object.keys(valueCounts);
    const datasetValues = Object.values(valueCounts);
  
    return {
      labels,
      datasets: [
        {
          label: `Distribution by ${option}`,
          data: datasetValues,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF8A80",
            "#A1887F",
          ],
        },
      ],
    };
  };