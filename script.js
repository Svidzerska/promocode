document.addEventListener("DOMContentLoaded", () => {
   //script starts
   class View {
      constructor() {
         this.input = document.querySelector("#promocode");
         this.button = document.querySelector(".generate_code");
         this.buttonGo = document.querySelector(".go");
         this.result = document.querySelector(".sales");
      }
   }

   class Model {
   }

   class Controller {
      constructor(view, model) {
         this.view = view;
         this.model = model;
         this.firstEvaluation = this.firstEvaluation.bind(this);
         this.mainEvaluation = this.mainEvaluation.bind(this);
         this.promocodeOneHundred = this.promocodeOneHundred.bind(this);
         this.promocodeThousand = this.promocodeThousand.bind(this);
         this.generateCode = this.generateCode.bind(this);
      }

      get result() {
         return this.mainResult;
      }

      promocodeThousand(promocodeAsArr, index_odd) {
         let quantityOfPairs = 0;
         let diffPair = 0;

         for (let i = 0; i < index_odd.length; i++) {
            if (index_odd[i + 1] - index_odd[i] === 1 && (i === 0 || promocodeAsArr[index_odd[i] - 1] % 2 === 0)) {
               if (promocodeAsArr[index_odd[i]] < promocodeAsArr[index_odd[i + 1]]) {
                  diffPair++;
               }
               quantityOfPairs++;
               i++;
            }
         }

         if (quantityOfPairs < 2) {
            this.promocodeOneHundred(promocodeAsArr);
         } else if (quantityOfPairs >= 2) {
            if (diffPair >= 2) {
               this.view.result.innerText = "2000";
               this.mainResult = 2000;
               console.log(this.result);
            } else {
               this.view.result.innerText = "1000";
               this.mainResult = 1000;
               console.log(this.result);
            }
         }
      }


      promocodeOneHundred(promocodeAsArr) {
         let summ_odd = 0; //нечетные
         let summ_even = 0; //четные

         for (let i = 0; i < promocodeAsArr.length; i++) {
            if (promocodeAsArr[i] % 2 === 0) {
               summ_even = summ_even + promocodeAsArr[i];
            } else {
               summ_odd = summ_odd + promocodeAsArr[i];
            }
         }

         if (summ_odd < summ_even) {
            this.view.result.innerText = "100";
            this.mainResult = 100;
            console.log(this.result);

         } else {
            this.view.result.innerText = "no";
            this.mainResult = 0;
            console.log(this.result);
         }
      }


      mainEvaluation(promocodeAsArr) {
         //определяем какой промокод имеем
         let index_odd = [];
         for (let i = 0; i < promocodeAsArr.length; i++) {
            if (promocodeAsArr[i] % 2 !== 0) {
               index_odd.push(i);
            }
         }

         if (index_odd.length < 4) {
            this.promocodeOneHundred(promocodeAsArr);
         } else if (index_odd.length >= 4) {
            this.promocodeThousand(promocodeAsArr, index_odd);
         }
      }


      //функция принимает промокод типа number
      set promocodeToArr(promocode) {
         if (typeof promocode === "number") {
            let promocodeArr = [];
            while (promocode) {
               promocodeArr.push(promocode % 10);
               promocode = Math.floor(promocode / 10);
            }

            if (promocodeArr.length === 8) {
               this.mainEvaluation(promocodeArr.reverse()); //промокод восьмизначное число
            }
         }
      }

      firstEvaluation() {
         let digit_8 = /^[1-9]\d{7}$/; //эту проверку делать не обязательно
         if (digit_8.test(this.view.input.value)) {
            let promocode = +this.view.input.value; //не может начинаться с нуля
            this.promocodeToArr = promocode;
         }
      }

      getInputValue() {
         this.view.input.addEventListener("input", this.firstEvaluation);
      }


      //for code generating
      generateCode() {
         let code = Math.floor(Math.random()*10e7);
         console.log(code);
         this.view.input.value = `${code}`;
      }

      pressButton() {
         this.view.button.addEventListener("click", this.generateCode);
      }

      pressButtonGo() {
         this.view.buttonGo.addEventListener("click", this.firstEvaluation);
      }
   }

   let view = new View();
   let model = new Model(view);
   let controller = new Controller(view, model);

   controller.getInputValue();

   controller.pressButton();
   controller.pressButtonGo();

   //script ends
})