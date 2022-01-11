// https://refactoring.guru/design-patterns/factory-method/typescript/example
interface Product {
  operation(): string
}

abstract class Creator {
  //Usually the creator has business logic that rely on Product
  public abstract factoryMethod(): Product

  public someOperation(): string {
    const product = this.factoryMethod()

    return `Creator: operation done with ${product.operation()}`
  }
}

class ConcreteCreator1 extends Creator {
  // Uses the same return (abstract product) even tho it returns a concrete product so creator can use both
  public factoryMethod(): Product {
    return new ConcreteProduct1()
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2()
  }
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct1}'
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct2}'
  }
}

function clientCode(creator: Creator) {
  // ...
  console.log(
    "Client: I'm not aware of the creator's class, but it still works.",
  )
  console.log(creator.someOperation())
  // ...
}

console.log('App: Launched with the ConcreteCreator1.')
clientCode(new ConcreteCreator1())
console.log('')

console.log('App: Launched with the ConcreteCreator2.')
clientCode(new ConcreteCreator2())
