import { useEffect, useState } from 'react';

import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Input from './components/Input';
import usePasswordGeneratorData from './hooks/usePasswordGeneratorData';

function App() {
  const {
    parameters: { passwordLength, uppercase, lowercase, numbers, symbols },
    onChangePasswordLength,
    onChangeCheckbox,
    generatePassword,
  } = usePasswordGeneratorData({ passwordLength: 19, numbers: false });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setGeneratedPassword('');
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied, setGeneratedPassword]);

  const handleCopiedPassword = () => {
    if (generatedPassword.length > 0) {
      navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
    }
  };

  return (
    <div className="wrapper">
      <div className="container wrapper-box">
        <h2>Password generator</h2>
        <div className="password-box">
          <Input
            type="password"
            disabled
            name="password"
            value={generatedPassword}
          />
          <Button
            className="copy-button"
            disabled={generatedPassword.length === 0 || copied}
            onClick={handleCopiedPassword}
          >
            {copied ? 'Copied' : 'Copy text'}
          </Button>
        </div>
        <br />
        <div className="word-crieteria__box">
          <Input
            name="password-length"
            type="number"
            min={2}
            max={20}
            value={passwordLength}
            label="Password length"
            onChange={(e) => onChangePasswordLength(parseInt(e.target.value))}
          />
        </div>
        {/* Uppercases */}
        <div className="word-crieteria__box">
          <Checkbox
            name="uppercase"
            checked={uppercase}
            label="Include uppercase letters"
            onChange={() => onChangeCheckbox('uppercase')}
          />
        </div>
        {/* Lowercases */}
        <div className="word-crieteria__box">
          <Checkbox
            name="lowercase"
            checked={lowercase}
            label="Include lowercase letters"
            onChange={() => onChangeCheckbox('lowercase')}
          />
        </div>
        {/* Numbers */}
        <div className="word-crieteria__box">
          <Checkbox
            name="numbers"
            checked={numbers}
            label="Include numbers"
            onChange={() => onChangeCheckbox('numbers')}
          />
        </div>
        {/* Symbols */}
        <div className="word-crieteria__box">
          <Checkbox
            name="symbols"
            checked={symbols}
            label="Include special symbols"
            onChange={() => onChangeCheckbox('symbols')}
          />
        </div>
        <div>
          <div>
            <Button
              className="generate-button"
              onClick={() => setGeneratedPassword(generatePassword())}
              disabled={!uppercase && !lowercase && !numbers && !symbols}
            >
              Generate password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
