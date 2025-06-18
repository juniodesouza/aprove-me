import { z } from 'zod'

export const dateValidator = (config: { require: boolean }) => {
   const schema = z
      .date()
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
