

class Ap{
    constructor(value){
        this.value = value;
    }
    //写一个类似静态工厂方法的of方法，用来返回生产我想要的实例
    static of(value){
        return new Ap(value);
    }
    ap(functor){
        return Ap.of(this.value(functor.value));
    }
}
let A = Ap.of(x=>x+1);
let B = Ap.of(1);

let result = A.ap(B);
console.log(result.value);