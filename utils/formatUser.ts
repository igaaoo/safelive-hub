export function FormatUser(rows: any) {

  var convertedResult = rows.map((row: any) => {
    if (row[0] == 'Newland SEL') {
      row[0] = 'Newland Select';
    } else if (row[0] == 'Newsedan RL') {
      row[0] = 'Newsedan Rogaciano Leite';
    } else if (row[0] == 'Newsedan VT') {
      row[0] = 'Newsedan Virgílio Távora';
    } else if (row[0] == 'Newsedan JP') {
      row[0] = 'Newsedan João Pessoa';
    } else if (row[0] == 'Newland Select PAR') {
      row[0] = 'Newland Select Parnaíba';
    } else if (row[0] == 'Newsedan SOB') {
      row[0] = 'Newsedan Sobral';
    } else if (row[0] == 'Newsedan JUA') {
      row[0] = 'Newsedan Juazeiro';

    } else if (row[0] == 'New House CE') {
      row[0] = 'New House Ceará';

    } else if (row[0] == 'New House THE') {
      row[0] = 'New House Teresina';

    } else if (row[0] == 'Newsedan CBD') {
      row[0] = 'Newsedan Cabedelo';

    } else if (row[0] == 'Newsedan SEL') {
      row[0] = 'Newsedan Select';
    } else if (row[0] == 'NLD') {
      row[0] = 'Land Rover';

    } else if (row[0] == 'Newland T.SUL') {
      row[0] = 'Newland Teresina Sul';

    } else if (row[0] == 'Newsedan SER') {
      row[0] = 'Newsedan Service';
    } else if (row[0] == 'Sedan THE Particip') {
      row[0] = 'Sedan Teresina Participação';
    }
    else if (row[0] == 'Newland CBD') {
      row[0] = 'Newland Cabedelo';
    } else if (row[0] == 'Newland KEN') {
      row[0] = 'Newland Kennedy';
    } else if (row[0] == 'NLD') {
      row[0] = 'Land Rover';
    } else if (row[0] == 'Newland JUA') {
      row[0] = 'Newland Juazeiro';
    } else if (row[0] == 'Newland THE') {
      row[0] = 'Newland Teresina';
    } else if (row[0] == 'Sedan RL') {
      row[0] = 'Sedan Rogaciano Leite';
    } else if (row[0] == 'Newland SOB') {
      row[0] = 'Newland Sobral';
    } else if (row[0] == 'Newland PAR') {
      row[0] = 'Newland Parnaíba';
    } else if (row[0] == 'Newland JP') {
      row[0] = 'Newland João Pessoa';
    } else if (row[0] == 'Newland ABO') {
      row[0] = 'Newland Abolição';
    }
    else {
      row[0] = row[0];
    }

    return {
      store: row[0],
      name: row[1],
      email: row[2],
      ramal: row[3],
      setor: row[4],
      role: row[5],
      date: row[6],
      login_ad: row[7],
      sit_ad: true,
      sit_nbs: true,
    };
  });

  return convertedResult;



}