import { FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ControllerRenderProps } from 'react-hook-form'
import { useEffect, useState } from 'react'

interface InputCurrencyProps {
   props: ControllerRenderProps<{ [x: string]: number | null }, string>
}

const InputCurrency = ({ props }: InputCurrencyProps) => {
   const { onChange, value } = props

   const [inputValue, setInputValue] = useState<string>('')

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\D/g, '')

      if (newValue == '' || Number(newValue) == 0) {
         return onChange(null)
      }

      const regex = new RegExp(`^\\d*,?\\d{0,2}$`)

      if (regex.test(newValue)) {
         onChange(Number(newValue))
      }
   }

   useEffect(() => {
      if (value === null) {
         setInputValue('')
      } else {
         const formattedValue = new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
         }).format(value / 100)

         setInputValue(formattedValue)
      }
   }, [value])

   return (
      <div className="relative">
         <span className="absolute left-3 top-2 text-sm text-muted-foreground">
            R$
         </span>
         <FormControl>
            <Input
               {...props}
               type="text"
               inputMode="numeric"
               className="pl-8"
               value={inputValue}
               onChange={handleChange}
            />
         </FormControl>
      </div>
   )
}

InputCurrency.displayName = 'InputCurrency'

export { InputCurrency }
