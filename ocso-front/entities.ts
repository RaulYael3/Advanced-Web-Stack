export interface Location {
    locationId: number
    locationName: string
    locationAddress: string
    locationLatLng: number[]
    manager?: any
    region?: any
    employee?: Employee[]
}

export interface Employee{
    employeeId: string
    employeeName: string
    employeeLastName: string
    employeePhoneNumber: string
    employeeEmail: string
    employeePhoto?: string
    location?: Location
    user?: any
}