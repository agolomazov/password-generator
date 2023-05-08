import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label: string;
}

type CheckboxRef = HTMLInputElement;

const Checkbox = forwardRef<CheckboxRef, Props>(
  ({ name, checked, onChange, label, ...props }: Props, ref) => {
    return (
      <>
        <div>
          <label htmlFor={name}>{label}</label>
        </div>
        <div>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            ref={ref}
            id={name}
            {...props}
          />
        </div>
      </>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
