import { AssignorEntity } from './assignor.entity'

export abstract class AssignorRepository {
  abstract create(assignor: AssignorEntity): Promise<AssignorEntity>
  abstract findById(id: string): Promise<AssignorEntity | null>
  abstract update(assignor: AssignorEntity): Promise<AssignorEntity>
  abstract delete(id: string): Promise<void>
  abstract findByDocument(document: string): Promise<AssignorEntity | null>
}
