import { useNavigate, useParams } from 'react-router-dom'
import { Page } from '@/components/layout/page'
import { toast } from '@/hooks/use-toast'
import { handleApiError } from '@/helpers/api-error-handler'
import { AssignorForm } from './assignor-form'
import { useFetchAssignor } from '@/hooks/queries/useFetchAssignor'
import { useUpsertAssignor, FormAssignorValues } from '@/hooks/mutations/useUpsertAssignor'

export function AssignorEdit() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: assignor, isLoading: loadingAssignor } = useFetchAssignor(id!)
  const upsertMutation = useUpsertAssignor(id)

  const isLoading = upsertMutation.isPending

  const handleSubmit = async (data: FormAssignorValues) => {
    try {
      await upsertMutation.mutateAsync(data)
      toast({
        description: id ? 'Alterações salvas com sucesso!' : 'Cadastro realizado com sucesso!',
        variant: 'success',
      })
      navigate('/app/assignors')
    } catch (error) {
      handleApiError(error)
    }
  }

  const handleCancel = () => {
    navigate('/app/assignors')
  }

  if (id && loadingAssignor) {
    return <div>Carregando...</div>
  }

  return (
    <Page title="Cedentes">
      <AssignorForm
        initialData={assignor}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onCancel={handleCancel}
      />
    </Page>
  )
}
