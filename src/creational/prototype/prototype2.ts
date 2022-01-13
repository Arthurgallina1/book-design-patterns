interface IClonable {
  clone(): object
}

// class Prototype implements IClonable {
//   identity: any
//   list: number[] = []

//   constructor(id: any) {
//     this.identity = id

//     for (let i = 0; i < 1000; i++) {
//       this.list.push(i)
//     }
//   }

//   public clone(): Prototype {
//     return Object.assign({}, this)
//   }
// }

// const prototype = new Prototype(100)

// const pClone = prototype.clone()

// console.log(prototype.list[10] === pClone.list[10])
// console.log(prototype.identity === pClone.identity)

class Shape implements IClonable {
  public X: number
  public Y: number
  public color: string

  constructor(source: Shape) {
    this.X = source.X
    this.Y = source.Y
    this.color = source.color
  }

  clone(): Shape {
    return Object.assign({}, this)
  }
}

class Rectangle extends Shape {
  public width: number
  public height: number

  constructor(source: any) {
    super(source) //construtor pai
    this.width = source.width
    this.height = source.height
  }

  clone(): Shape {
    return new Rectangle(this)
  }
}

class Circle extends Shape {
  public radius: number

  constructor(source: any) {
    super(source) //construtor pai
    this.radius = source.radius
  }

  clone(): Shape {
    return new Circle(this)
  }
}

class App {
  public shapes: Array<Shape> = []

  constructor() {
    const circle = new Circle({ radius: 10 })
    circle.X = 10
    circle.Y = 25
    this.shapes.push(circle)

    const anotherCircle = circle.clone()
    anotherCircle.color = 'red'
    this.shapes.push(anotherCircle)

    const rect = new Rectangle({
      width: 11,
      height: 25,
      X: 10,
      Y: 25,
      color: 'black',
    })

    this.shapes.push(rect)
  }
}

function clientCode() {
  const app = new App()

  const shapesCopy: Array<Shape> = []

  for (const shape of app.shapes) {
    shapesCopy.push(shape.clone())
  }

  console.log(shapesCopy)
}

clientCode()
