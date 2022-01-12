//Define the product
type Material = 'wood' | 'steel'

class House {
  roof: Material
  floor: Material
  walls: Material | 'iron'
}

// Define creation steps and declare an builder interface
interface IHouseBuilder {
  createRoof(): void
  createWalls(): void
  createFloor(): void
}

// Create a Concrete Builder for each product representation and implement the steps.
//Create a method to retrieve the product
class WoodHouseBuilder implements IHouseBuilder {
  private house: House = new House()

  public reset(): void {
    this.house = new House()
  }

  createRoof(): void {
    this.house.roof = 'wood'
  }

  createWalls(): void {
    this.house.walls = 'wood'
  }

  createFloor(): void {
    this.house.floor = 'wood'
  }

  getHouse(): House {
    const result = this.house
    this.reset()
    return result
  }
}

class SteelHouseBuilder implements IHouseBuilder {
  private house: House = new House()

  public reset(): void {
    this.house = new House()
  }

  createRoof(): void {
    this.house.roof = 'steel'
  }

  createWalls(): void {
    this.house.walls = 'iron'
  }

  createFloor(): void {
    this.house.floor = 'steel'
  }

  getHouse(): House {
    const result = this.house
    this.reset()
    return result
  }
}

// Create a director to encapsulate many ways of building the product using the same builder
class HouseDirector {
  private houseBuilder: IHouseBuilder

  public setBuilder(houseBuilder: IHouseBuilder) {
    this.houseBuilder = houseBuilder
  }

  public buildFullHouse(): void {
    this.houseBuilder.createFloor()
    this.houseBuilder.createRoof()
    this.houseBuilder.createWalls()
  }

  public buildNonRoofHouse(): void {
    this.houseBuilder.createFloor()
    this.houseBuilder.createWalls()
  }
}

//Cliente code creates builder objects and director objects passing the builder to the director - The builder can be passed as a parameter to the Director

function clientCode() {
  // Without a director
  //   const woodHouseBuilder = new WoodHouseBuilder()
  //   woodHouseBuilder.createFloor()
  //   woodHouseBuilder.createRoof()
  //   woodHouseBuilder.createWalls()
  //   const woodHouseBuilt = woodHouseBuilder.getHouse()
  //   console.log('Wood', woodHouseBuilt)

  //   const steelHouseBuilder = new SteelHouseBuilder()
  //   steelHouseBuilder.createFloor()
  //   steelHouseBuilder.createWalls()
  //   const steelHouseBuilt = steelHouseBuilder.getHouse()
  //   console.log('Steel', steelHouseBuilt)

  const woodHouseBuilder = new WoodHouseBuilder()
  const steelHouseBuilder = new SteelHouseBuilder()
  const houseDirector = new HouseDirector()
  houseDirector.setBuilder(woodHouseBuilder)
  houseDirector.buildNonRoofHouse()
  const woodFullHouseBuilt = woodHouseBuilder.getHouse()
  console.log('Wood', woodFullHouseBuilt)

  houseDirector.setBuilder(steelHouseBuilder)
  houseDirector.buildFullHouse()
  const steelFulLHouse = steelHouseBuilder.getHouse()
  console.log('Wood', steelFulLHouse)
}

clientCode()
