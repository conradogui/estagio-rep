// 1)
let indice = 13;
let soma = 0;
let k = 0;

while (k < indice) {
  k = k + 1;
  soma = soma + k;
}
document.getElementById("somaResultado").textContent = `1) Soma: ${soma}`;

// 2)
function pertenceFibonacci(numero) {
  let a = 0;
  let b = 1;
  let temp;

  if (numero === 0 || numero === 1) {
    return `${numero} pertence à sequência de Fibonacci.`;
  }

  while (b < numero) {
    temp = a;
    a = b;
    b = temp + b;
  }

  if (b === numero) {
    return `${numero} pertence à sequência de Fibonacci.`;
  } else {
    return `${numero} não pertence à sequência de Fibonacci.`;
  }
}

let numeroInformado = 21;
document.getElementById(
  "fibonacciResultado"
).textContent = `2) ${pertenceFibonacci(numeroInformado)}`;

// 3)
function calcularFaturamento(faturamento) {
  let menorValor = null;
  let maiorValor = null;
  let somaFaturamento = 0;
  let diasComFaturamento = 0;

  const diasValidos = faturamento.dias.filter((dia) => dia.valor > 0);

  diasValidos.forEach((dia) => {
    if (menorValor === null || dia.valor < menorValor) {
      // aqui vou verificar se o menor vlor ja foi definido (null)
      menorValor = dia.valor;
    }
    if (maiorValor === null || dia.valor > maiorValor) {
      maiorValor = dia.valor;
    }
    somaFaturamento += dia.valor;
    diasComFaturamento++;
  });

  const mediaMensal =
    diasComFaturamento > 0 ? somaFaturamento / diasComFaturamento : 0;

  const diasAcimaDaMedia = diasValidos.filter(
    (dia) => dia.valor > mediaMensal
  ).length;

  return {
    menorValor,
    maiorValor,
    diasAcimaDaMedia,
    mediaMensal,
  };
}

function carregarFaturamento() {
  //para carregar meu arquivo json
  fetch("./faturamento.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((faturamentoMensal) => {
      const resultado = calcularFaturamento(faturamentoMensal);

      const faturamentoTexto = ` 3) Menor valor de faturamento: R$ ${
        resultado.menorValor
      }<br>
                Maior valor de faturamento: R$ ${resultado.maiorValor}<br>
                Número de dias com faturamento acima da média: ${
                  resultado.diasAcimaDaMedia
                } <br>
                Média mensal de faturamento: R$ ${resultado.mediaMensal.toFixed(
                  2
                )}`;
      document.getElementById("faturamentoResultado").innerHTML =
        faturamentoTexto;
    })
    .catch((error) => {
      console.error(error);
    });
}
carregarFaturamento();

// 4)
function calcularPercentuais(faturamento) {
  const totalFaturamento = Object.values(faturamento).reduce(
    (acc, valor) => acc + valor,
    0
  );
  const percentuais = {};

  for (const estado in faturamento) {
    percentuais[estado] = (
      (faturamento[estado] / totalFaturamento) *
      100
    ).toFixed(2);
  }

  return { totalFaturamento, percentuais };
}

const faturamentoMensal = {
  SP: 67836.43,
  RJ: 36678.66,
  MG: 29229.88,
  ES: 27165.48,
  Outros: 19849.53,
};

const { totalFaturamento, percentuais } =
  calcularPercentuais(faturamentoMensal);

document.getElementById(
  "totalFaturamento"
).textContent = `4) Total de faturamento: R$ ${totalFaturamento.toFixed(2)}`;
const resultadosDiv = document.getElementById("resultados");

for (const estado in percentuais) {
  const percentualTexto = `${estado}: ${percentuais[estado]}%`;
  const paragrafo = document.createElement("p");
  paragrafo.textContent = percentualTexto;
  resultadosDiv.appendChild(paragrafo);
}

// 5)
function inverterString(str) {
  let stringInvertida = "";
  for (let i = str.length - 1; i >= 0; i--) {
    stringInvertida += str[i];
  }
  return stringInvertida;
}

let stringOriginal = "Guilherme Conrado Maia";
let resultado = inverterString(stringOriginal);

document.getElementById(
  "resultado"
).textContent = `5) String original: "${stringOriginal}" String invertida: "${resultado}"`;
