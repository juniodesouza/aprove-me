import { z } from 'zod'

export const selectValidator = (config: { require: boolean }) => {
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

         return val
      })

   return schema
}
