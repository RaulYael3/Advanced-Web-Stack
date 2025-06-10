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

export interface Provider {
    providerId: string
    providerName: string
    providerEmail: string
    providerPhone: string
    products: Product[]
}

export interface Product {
    productId: string;
    name: string;
    price: number;
    countSeal: number;
    provider: Provider;
}

export interface User {
    userEmail: string
    userPassword: string
    userRoles: string[]
    manager?: Manager
    employee?: Employee
} 