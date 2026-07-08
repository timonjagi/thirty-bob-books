import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  TextBoxCommonBase,
  TextareaBase,
  TextBoxDisable,
  TextBoxEnable,
} from 'components/utils/theme';

export interface Props {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  [key: string]: unknown;
}

export const defaultProps = {
  disabled: false,
  readOnly: false,
  className: '',
  placeholder: '',
  initialValue: '',
};

type NativeAttrs = Omit<React.TextareaHTMLAttributes<any>, keyof Props>;

export type TextAreaPropsType = Props & NativeAttrs;

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.PropsWithChildren<TextAreaPropsType>
>(
  (
    {
      className,
      id,
      value,
      name,
      initialValue,
      disabled,
      readOnly,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref: React.Ref<HTMLTextAreaElement | null>
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => inputRef.current);

    const [initValue, setInitValue] = useState<string>(initialValue);

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled || readOnly) return;
      setInitValue(event.target.value);
      onChange && onChange(event);
    };

    const focusHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onFocus && onFocus(e);
    };
    const blurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur && onBlur(e);
    };

    useEffect(() => {
      if (value === undefined) return;
      setInitValue(value);
    }, [value]);

    const classNames =
      TextareaBase +
      ' ' +
      TextBoxCommonBase +
      ' ' +
      (disabled === true ? TextBoxDisable : TextBoxEnable) +
      ' ' +
      className;

    return (
      <React.Fragment>
        <label htmlFor={id} className="sr-only">
          {name}
        </label>
        <textarea
          ref={inputRef}
          placeholder={placeholder}
          className={classNames}
          id={name}
          value={initValue}
          disabled={disabled}
          readOnly={readOnly}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          name={name}
          {...props}
        />
      </React.Fragment>
    );
  }
);

TextArea.defaultProps = defaultProps;

export default TextArea;
