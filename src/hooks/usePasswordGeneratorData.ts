import { useState } from 'react';

export interface PasswordGeneratorConfig {
  passwordLength: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const defaultValues: PasswordGeneratorConfig = {
  passwordLength: 15,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

const lowercasesArray = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const uppercaseArray = lowercasesArray.join('').toUpperCase().split('');

const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const symbolsArray = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '-',
  '}',
  '{',
];

type NumberOrString = string | number;

const shuffleArray = (array: NumberOrString[]) =>
  array.sort(() => Math.random() - 0.5);

const generatePassword = ({
  passwordLength,
  uppercase,
  lowercase,
  numbers,
  symbols,
}: PasswordGeneratorConfig): string => {
  const availableCharacters: NumberOrString[] = [
    ...(uppercase ? uppercaseArray : []),
    ...(lowercase ? lowercasesArray : []),
    ...(numbers ? numbersArray : []),
    ...(symbols ? symbolsArray : []),
  ];

  const characters = shuffleArray(availableCharacters).slice(0, passwordLength);

  return characters.join('');
};

const usePasswordGeneratorData = () => {
  const [mergedConfig, setConfig] = useState<PasswordGeneratorConfig>({
    ...defaultValues,
  });

  const handleChangePasswordLength = (length: number): void => {
    setConfig((prev) => ({
      ...prev,
      passwordLength: length,
    }));
  };

  const handleChangeCheckbox = (
    key: keyof Omit<PasswordGeneratorConfig, 'passwordLength'>
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const generatePasswordString = () => generatePassword(mergedConfig);

  return {
    parameters: mergedConfig,
    onChangePasswordLength: handleChangePasswordLength,
    onChangeCheckbox: handleChangeCheckbox,
    generatePassword: generatePasswordString,
  };
};

export default usePasswordGeneratorData;
