import { z } from 'zod'

export const currencyValidator = (config: { require: boolean }) => {
   const schema = z
      .number()
      .nullable()
      .transform((val, ctx) => {
         if (val == null) {
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

         return val
      })

   return schema
}
