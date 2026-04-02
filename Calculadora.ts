

export class calculadora {
    resultado: number = 0;
   
    exibirResultado() {
    console.log("O resultado é: " + this.resultado);
    }

    soma(a: number, b: number) {
        this.resultado = a + b;
    }
    subtracao(a: number, b: number) {
        this.resultado = a - b;
    }
    multiplicacao(a: number, b: number) {
        this.resultado = a * b;
    }
    divisao(a: number, b: number) {
        this.resultado = a / b;
    }
}
