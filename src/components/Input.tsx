import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label?: string;
}

type InputRef = HTMLInputElement;

const Input = forwardRef<InputRef, Props>(
  ({ name, value, label, onChange, ...props }: Props, ref) => {
    return (
      <>
        {label && (
          <>
            <div>
              <label htmlFor={name}>{label}</label>
            </div>
            <div>
              <input
                onChange={onChange}
                value={value}
                ref={ref}
                id={name}
                {...props}
              />
            </div>
          </>
        )}
        {!label && (
          <input
            onChange={onChange}
            value={value}
            ref={ref}
            id={name}
            {...props}
          />
        )}
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
