import { z } from 'zod'

export const stringValidator = (config: {
   require: boolean
   inputType?: 'cnpj' | 'cpf' | 'document' | 'phone' | 'email'
}) => {
   const schema = z
      .string()
      .nullable()
      .transform((val, ctx) => {
         if (val === null) {
            if (config.require) {
               ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Este campo é obrigatório',
               })
               return z.NEVER
            } else {
               return null
            }
         }

         if (config.inputType == 'cnpj') {
            if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(val)) {
               ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'CNPJ inválido',
               })
               return z.NEVER
            }
         }

         if (config.inputType == 'cpf') {
            if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val)) {
               ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'CPF inválido',
               })
               return z.NEVER
            }
         }

         if (config.inputType == 'document') {
            if (
               !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val) &&
               !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(val)
            ) {
               ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Documento inválido',
               })
               return z.NEVER
            }
         }

         if (config.inputType == 'phone') {
            if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(val)) {
               ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Telefone inválido',
               })
               return z.NEVER
            }
         }

         if (config.inputType == 'email') {
            if (
               !/^[a-zA-Z\u0400-\u04FF0-9._%+-]+@[a-zA-Z\u0400-\u04FF0-9.-]+\.[a-zA-Z]{2,}$/.test(
                  val
               )
            ) {
               ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'E-mail inválido',
               })
               return z.NEVER
            }
         }

         if (
            config.inputType == 'cnpj' ||
            config.inputType == 'cpf' ||
            config.inputType == 'document' ||
            config.inputType == 'phone'
         ) {
            return val.replace(/\D/g, '')
         }

         return val
      })

   return schema
}
