import { FormControl } from '@/components/ui/form'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format, isValid, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ControllerRenderProps } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { CalendarDays } from 'lucide-react'

interface InputDateProps {
   props: ControllerRenderProps<{ [x: string]: Date | null }, string>
}

const InputDate = ({ props }: InputDateProps) => {
   const { onChange, value } = props

   const [open, setOpen] = useState(false)
   const [inputValue, setInputValue] = useState<string>('')
   const [month, setMonth] = useState<Date | null>(value)

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/\D/g, '')

      if (val.length > 8) {
         val = val.slice(0, 8)
      }

      let formattedValue = val
      if (val.length > 4) {
         formattedValue = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`
      } else if (val.length > 2) {
         formattedValue = `${val.slice(0, 2)}/${val.slice(2)}`
      }

      setInputValue(formattedValue)

      if (e.target.value.length === 10) {
         const parsedDate = parse(e.target.value, 'dd/MM/yyyy', new Date())
         if (isValid(parsedDate)) {
            onChange(parsedDate)
         }
      }
   }

   const handleBlur = () => {
      const parsedDate = parse(inputValue, 'dd/MM/yyyy', new Date())
      if (inputValue.length != 10 || !isValid(parsedDate)) {
         onChange(null)
         setInputValue('')
      }
   }

   const handleCalendarSelect = (selectedDate: Date | undefined) => {
      onChange(selectedDate ?? null)
      setOpen(false)
   }

   useEffect(() => {
      if (value && isValid(value)) {
         setInputValue(format(value, 'dd/MM/yyyy'))
         setMonth(value)
      } else {
         setInputValue('')
      }
   }, [value])

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <div className="relative">
               <FormControl>
                  <Input
                     {...props}
                     type="text"
                     className="pr-8"
                     inputMode="numeric"
                     value={inputValue}
                     onChange={handleChange}
                     onBlur={handleBlur}
                  />
               </FormControl>
               <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 cursor-pointer text-muted-foreground" />
            </div>
         </PopoverTrigger>
         <PopoverContent
            className="w-auto p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
         >
            <Calendar
               mode="single"
               locale={ptBR}
               defaultMonth={value ?? undefined}
               month={month ?? undefined}
               onMonthChange={setMonth}
               selected={value ?? undefined}
               onSelect={handleCalendarSelect}
               autoFocus={false}
            />
         </PopoverContent>
      </Popover>
   )
}

InputDate.displayName = 'InputDate'

export { InputDate }
