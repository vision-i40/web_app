export type Unit = {
  id: number
  name: string
}

const MeasurementService = () => ({
  fetchAllUnits(): Promise<Unit[]> {
    return Promise.resolve([
      {
        id: 1,
        name: 'Litros'
      }
    ])
  }
})

export default MeasurementService
