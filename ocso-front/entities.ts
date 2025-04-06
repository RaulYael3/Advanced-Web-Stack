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

export interface Manager {
    managerId: string
    managerFullName: string
    managerSalary: number
    managerEmail: string
    managerPhoneNumber: string
    location?: Location
    user?: any
}