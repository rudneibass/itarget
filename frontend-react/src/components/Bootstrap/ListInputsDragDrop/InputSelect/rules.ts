export const rules: { [key: string]: (value: string) => boolean }  = {
  'required': (value: string): boolean => {         
        return value ? true : false;
    },
}