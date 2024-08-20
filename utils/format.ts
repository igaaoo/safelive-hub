export function Format(json: any) {
  const rows = json.rows;
  const metaData = json.metaData;

  // Transforma o metaData em um objeto onde a chave é o valor do campo "name"
  const metaDataObj = metaData.reduce((obj: any, item: any) => {
    obj[item.name] = null;
    return obj;
  }, {});

  // Mapeia cada row para um objeto usando o metaData como chave
  const mappedRows = rows.map((row: any[]) => {
    const rowObj = { ...metaDataObj };
    metaData.forEach((item: any, index: number) => {
      rowObj[item.name] = row[index];
    });
    return rowObj;
  });


  return mappedRows;
}


