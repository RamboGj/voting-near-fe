import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  label: string
}

export function Input({ placeholder, label, id, ...rest }: InputProps) {
  return (
    <div className="mt-5 flex flex-col gap-1">
      <label htmlFor={id} className="text-lg font-medium text-black">
        {label}
      </label>
      <input
        {...rest}
        className="rounded-xl border border-gray300 px-4 py-3 text-base text-black placeholder:text-gray500 focus:border-blue500 focus:outline-none"
        id={id}
        placeholder={placeholder}
      />
    </div>
  )
}
