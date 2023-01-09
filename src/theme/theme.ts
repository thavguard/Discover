import { extendTheme } from "@chakra-ui/react";
// @ts-ignore
import variables from 'styles/variables/_index.scss'


console.log(variables)

export const theme = extendTheme({
    colors: {
        primary: {
            100: variables.primary,
            200: variables.primary100,
            300: variables.primary200,
        },
        secondary: {
            100: variables.secondary
        }
    }
})
