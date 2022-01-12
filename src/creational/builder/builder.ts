// Define steps (methods) and declare it on builder base interface
interface Builder {
  producePartA(): void
  producePartB(): void
  producePartC(): void
}

//Create a Concrete builder class for each representation of the product
// and implement its construction steps.
//It follows same interface with specific implementations and may have many variations

class ConcreteBuilder1 implements Builder {
  private product: ProductType1

  /**
   * A fresh builder instance should contain a blank product object, which is
   * used in further assembly.
   */
  constructor() {
    this.reset()
  }

  public reset(): void {
    this.product = new ProductType1()
  }

  public producePartA(): void {
    this.product.parts.push('Part A 1')
  }

  public producePartB(): void {
    this.product.parts.push('Part B 1')
  }
  public producePartC(): void {
    this.product.parts.push('Part C 1')
  }

  //Concrete Builder need a method to retrieve the result as they might not follow same interface
  public getProduct(): ProductType1 {
    const result = this.product
    this.reset()
    return result
  }
}

class ConcreteBuilderEndPart implements Builder {
  private product: ProductType1

  /**
   * A fresh builder instance should contain a blank product object, which is
   * used in further assembly.
   */
  constructor() {
    this.reset()
  }

  public reset(): void {
    this.product = new ProductType1()
  }

  public producePartA(): void {
    this.product.parts.push('Part Z 3')
  }

  public producePartB(): void {
    this.product.parts.push('Part Y 3')
  }
  public producePartC(): void {
    this.product.parts.push('Part X 4')
  }

  //Concrete Builder need a method to retrieve the result as they might not follow same interface
  public getProduct(): ProductType1 {
    const result = this.product
    this.reset()
    return result
  }
}

class ProductType1 {
  public parts: string[] = []

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}\n`)
  }
}

// Create a director class that encapsulates ways of build products using the same builder

class Director {
  private builder: Builder

  /**
   * The Director works with any builder instance that the client code passes
   * to it.
   */
  public setBuilder(builder: Builder): void {
    this.builder = builder
  }

  /**
   * The Director can construct several product variations using the same
   * building steps.
   */
  public buildMinimalViableProduct(): void {
    this.builder.producePartA()
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA()
    this.builder.producePartB()
    this.builder.producePartC()
  }
}

// Client create objects of builder and director passing the builder to the director through paramets

//The client obtains the result from the builder (if they dotn follow same interface)
function clientCode(director: Director) {
  const builder = new ConcreteBuilder1()
  director.setBuilder(builder)

  console.log('Standard basic product:')
  director.buildMinimalViableProduct()
  builder.getProduct().listParts()

  console.log('Standard full featured product:')
  director.buildFullFeaturedProduct()
  builder.getProduct().listParts()

  //Builder pattern can be used without a Director class.
  console.log('Custom product:')
  builder.producePartA()
  builder.producePartC()
  builder.getProduct().listParts()

  const builderPartC = new ConcreteBuilderEndPart()
  director.setBuilder(builderPartC)

  console.log('Part 2 builder')
  director.buildFullFeaturedProduct()
  builderPartC.getProduct().listParts()
}

const director = new Director()
clientCode(director)
