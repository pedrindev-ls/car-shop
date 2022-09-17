import { expect } from "chai"
import { Model } from "mongoose"
import Sinon from "sinon"
import CarsModel from "../../../models/CarsModel"
import { modelCarMock, modelCarMockUpdate, modelCarMockUpdateWIthId, modelCarMockWithId } from "../../mocks/modelMock"

const carsModel = new CarsModel()

describe('testando se a camada model', () => {
  afterEach(() => {
    Sinon.restore();
  })
  it('Retorna o item criado com sucesso', async () => {
    Sinon.stub(Model, 'create').resolves(modelCarMockWithId)
    const createdItem = await carsModel.create(modelCarMock)

    expect(createdItem).to.be.equal(modelCarMockWithId)
  })
  it('Lista todos os itens do banco de dados', async () => {
    Sinon.stub(Model, 'find').resolves([modelCarMockWithId]);
    const readingItems = await carsModel.read();
    const arrayOfItems = [modelCarMockWithId]

    expect(readingItems).to.be.eql(arrayOfItems)
  })
  it('Lista um item especifico', async () => {
    Sinon.stub(Model, 'findById').resolves(modelCarMockWithId)
    const items = await carsModel.readOne("4edd40c86762e0fb12000003")

    expect(items).to.be.eql(modelCarMockWithId)
  })
  it('Atualiza um item especifico', async () => {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(modelCarMockUpdateWIthId)
    const items = await carsModel.update(modelCarMockUpdateWIthId._id, modelCarMockUpdate)

    expect(items).to.be.eql(modelCarMockUpdateWIthId)
  })
})