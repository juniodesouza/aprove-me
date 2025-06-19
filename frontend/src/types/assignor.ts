export interface Assignor {
   id: string
   name: string
   documentType: 'cpf' | 'cnpj'
   document: string
   email: string
   phone: string
}
