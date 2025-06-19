import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import { useFetchAssignors } from '@/hooks/queries/useFetchAssignors'
import { AssignorTable } from './assignor-table'
import { Assignor } from '@/types/assignor'
import DeleteAlertDialog from '@/components/custom/alert-delete'
import { useState } from 'react'
import { useDeleteAssignor } from '@/hooks/mutations/useDeleteAssignor'
import { handleApiError } from '@/helpers/api-error-handler'
import { toast } from '@/hooks/use-toast'

export function AssignorList() {
  const navigate = useNavigate()

  const [openAlert, setOpenAlert] = useState(false)
  const [id, setId] = useState<string>('')

  const { data: assignors, isLoading } = useFetchAssignors()
  const deleteMutation = useDeleteAssignor()

  if (isLoading) {
    return <div>Carregando...</div>
  }

  const createNewRegister = (
    <Button className="px-4" asChild>
      <Link to={`/app/assignors/create`}>
        <PlusIcon />
        Novo registro
      </Link>
    </Button>
  )

  const handleEdit = (assignor: Assignor) => {
    navigate(`/app/assignors/${assignor.id}/edit`)
  }

  const handleConfirmDelete = (assignor: Assignor) => {
    setId(assignor.id)
    setOpenAlert(true)
  }

  const handleDelete = async () => {
    if (!id) return

    try {
      await deleteMutation.mutateAsync(id)
      setId('')
      setOpenAlert(false)
      toast({ description: 'Registro excluído com sucesso', variant: 'success' })
    } catch (error) {
      handleApiError(error)
    }
  }

  return (
    <Page title="Cedentes" actions={createNewRegister}>
      <AssignorTable assignors={assignors} onEdit={handleEdit} onDelete={handleConfirmDelete} />
      <DeleteAlertDialog open={openAlert} onOpenChange={setOpenAlert} onConfirm={handleDelete} />
    </Page>
  )
}
