import { Organization } from "./organization";

export interface Client {
    id : number;
    fullName: string;
    email: string;
    phoneNumber: string;
    idOrganization: string;
    password: string;
    idClient: string;
    organization: Organization;
}
