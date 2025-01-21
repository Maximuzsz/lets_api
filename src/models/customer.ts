export interface Customer {
    id: string;
    fullName: string;
    birthDate: string;
    isActive: boolean;
    addresses: Address[];
    contacts: Contact[];
}
  
export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}
  
export interface Contact {
    email: string;
    phone: string;
    isPrimary: boolean;
}