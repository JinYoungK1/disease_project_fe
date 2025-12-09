import { InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField = forwardRef(function (
  { placeholder = '', label, ...rest }: Props,
  ref
) {
  return (
    <div>
      {label && (
        <label
          // for="input-label"
          className="mb-2 block text-md font-bold">
          {label}
        </label>
      )}

      <input
        type="text"
        className="peer block w-full rounded-lg border border-gray-200 p-2 text-md autofill:pb-2 autofill:pt-2 focus:border-blue-500 focus:pb-2 focus:pt-2 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-2"
        // id="hs-hero-signup-form-floating-input-id"
        // @ts-ignore
        ref={ref}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
});

export default InputField;
