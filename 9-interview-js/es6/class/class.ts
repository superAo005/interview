class Animal {
  public size: string = "small";
  protected name: string;
  private fierce: number;
  protected constructor(animalName: string, fierce = 0) {
    this.name = animalName;
  }
  setSize(animalSize: string) {
    this.size = animalSize;
  }
  setName(animalName: string): void {
    this.name = animalName;
  }
  getFierce(): number {
    return this.fierce;
  }
}

class Cat extends Animal {
  constructor(catName: string) {
    super(catName);
  }
  getAnimalSize(): string {
    return this.size;
    // public 在子类里可以直接取到
  }
  getAnimalName(): string {
    return this.name;
    // 这样可以取到name，因为name是protected，可以在子类里访问
  }

  //     getAnimalFierce():number{
  //          return this.fierce
  //     }

  // this.fierce这样取不到fierce，因为fierce是private私有的，只能在声明它的类里访问，只能在Animal类里访问
  // Property 'fierce' is private and only accessible within class 'Animal'
}

let cat = new Cat("Cat");

// let animal = new Animal("Dog")
// 构造函数前加protected，就不能实例化了
// Constructor of class 'Animal' is protected and only accessible within the class declaration.

// console.log("这个动物是： " + cat.name)
// animal.name 这样取不到name，因为name是protected，但是可以在子类里访问
//  Property 'name' is protected and only accessible within class 'Animal' and its subclasses.

console.log("这个动物是： " + cat.getAnimalName());
console.log("小猫的大小是： " + cat.size); // 可以直接.size取，因为size是public
