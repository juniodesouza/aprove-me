import { FormControl } from '@/components/ui/form'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { ControllerRenderProps } from 'react-hook-form'

interface InputSelectProps {
   itens: { value: string | number; label: string }[]
   props: ControllerRenderProps<{ [x: string]: string | null }, string>
}

const InputSelect = ({ itens, props }: InputSelectProps) => {
   const { onChange, value } = props

   const handleChange = (value: string) => {
      onChange(value === '' ? null : value)
   }

   return (
      <Select onValueChange={handleChange} value={value ?? undefined}>
         <FormControl>
            <SelectTrigger>
               <SelectValue placeholder="Selecione" />
            </SelectTrigger>
         </FormControl>
         <SelectContent>
            {itens.map(function (item, idx) {
               return (
                  <SelectItem value={item.value.toString()} key={idx}>
                     {item.label}
                  </SelectItem>
               )
            })}
         </SelectContent>
      </Select>
   )
}

InputSelect.displayName = 'InputSelect'

export { InputSelect }
