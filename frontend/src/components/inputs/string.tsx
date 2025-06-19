import { FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ControllerRenderProps } from 'react-hook-form'
import InputMask from '@mona-health/react-input-mask'

type inputType = 'cnpj' | 'cpf' | 'phone' | 'email'

const masks = {
   cnpj: '99.999.999/9999-99',
   cpf: '999.999.999-99',
   phone: '(99) 99999-9999',
}

interface InputStringProps {
   inputType?: inputType
   props: ControllerRenderProps<{ [x: string]: string | null }, string>
}

const InputString = ({ inputType, props }: InputStringProps) => {
   const { onChange, value } = props

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue.trim() === '' ? null : newValue)
   }

   if (inputType == 'cnpj') {
      return (
         <FormControl>
            <InputMask
               mask={masks.cnpj}
               value={value ?? ''}
               onChange={handleChange}
               onBlur={props.onBlur}
            >
               <Input
                  {...props}
                  type="text"
                  inputMode="numeric"
                  onChange={handleChange}
                  value={value ?? ''}
               />
            </InputMask>
         </FormControl>
      )
   }

   // CPF
   else if (inputType == 'cpf') {
      return (
         <FormControl>
            <InputMask
               mask={masks.cpf}
               value={value ?? ''}
               onChange={handleChange}
               onBlur={props.onBlur}
            >
               <Input
                  {...props}
                  type="text"
                  inputMode="numeric"
                  onChange={handleChange}
                  value={value ?? ''}
               />
            </InputMask>
         </FormControl>
      )
   }

   // Phone
   else if (inputType == 'phone') {
      return (
         <FormControl>
            <InputMask
               mask={'(99) 99999-9999'}
               value={value ?? ''}
               onChange={handleChange}
               onBlur={props.onBlur}
            >
               <Input
                  {...props}
                  type="text"
                  inputMode="numeric"
                  onChange={handleChange}
                  value={value ?? ''}
               />
            </InputMask>
         </FormControl>
      )
   }

   // Default
   else {
      return (
         <FormControl>
            <Input
               {...props}
               type="text"
               inputMode={inputType == 'email' ? 'email' : 'text'}
               onChange={handleChange}
               value={value ?? ''}
            />
         </FormControl>
      )
   }
}

InputString.displayName = 'InputString'

export { InputString }
