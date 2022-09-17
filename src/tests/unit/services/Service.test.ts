import { expect } from "chai"
import Sinon from "sinon"
import { CarZodSchema } from "../../../interfaces/ICar"
import CarsModel from "../../../models/CarsModel"
import CarsService from "../../../services/CarsService"
import { arrayOfMocks, modelCarError, modelCarMock, modelCarMockUpdate, modelCarMockUpdateWIthId, modelCarMockWithId } from "../../mocks/modelMock"

const carsModel = new CarsModel()
const carsService = new CarsService(carsModel, CarZodSchema)

describe('Testando a camada service', () => {
  afterEach(() => {
    Sinon.restore()
  })
  it('retorna com sucesso o item criado', async () => {
    Sinon.stub(carsModel, 'create').resolves(modelCarMockWithId)
    const item = await carsService.create(modelCarMock)

    expect(item).to.be.equal(modelCarMockWithId)
  })
  it('retorna um erro quando envia o objeto errado para criar', async () => {
    try {
      await carsService.create(modelCarError)
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
    }
  })
  it('retorna um array de itens do banco', async () => {
    Sinon.stub(carsModel, 'read').resolves(arrayOfMocks)
    const item = await carsService.read()

    expect(item).to.be.eql(arrayOfMocks)
  })
  it('retorna um item expecífico', async () => {
    Sinon.stub(carsModel, 'readOne').resolves(modelCarMockWithId)
    const item = await carsService.readOne(modelCarMockWithId._id)

    expect(item).to.be.eql(modelCarMockWithId)
  })
  it('retorna um erro se enviar um array errado', async () => {
    try {
      await carsService.readOne('4edd40c86762e0fb120000')
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
    }
  })
  it('atualiza um item especifico', async () => {
    Sinon.stub(carsModel, 'update').resolves(modelCarMockUpdateWIthId)
    const item = await carsService.update(modelCarMockUpdateWIthId._id, modelCarMockUpdate)

    expect(item).to.be.eql(modelCarMockUpdateWIthId)
  })
})