import React from 'react';

import { Card, CardContent, CardActions, Button, TextField, Typography } from 'core';

import './basicForm.scss';

interface InputItem {
  key: string;
  label: string;
  type: string;
  value: any;
}

function renderInputs(
  inputItems: InputItem[],
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
): React.ReactNode {
  return inputItems.map(item => {
    return (
      <TextField
        required
        className="basic-form-textfield"
        key={item.key}
        id={item.label}
        name={item.label}
        label={item.label}
        type={item.type}
        autoComplete={`current-${item.label}`}
        margin="normal"
        value={item.value}
        onChange={onChange}
        fullWidth
      />
    );
  });
}

interface Props {
  titleLabel: string;
  buttonLabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputItems: InputItem[];
}

function BasicForm(props: Props): React.ReactElement {
  const { titleLabel, buttonLabel, inputItems, onChange, onSubmit } = props;

  return (
    <form onSubmit={onSubmit}>
      <div className="basic-form">
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {titleLabel}
            </Typography>
            {renderInputs(inputItems, onChange)}
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" type="submit">
              {buttonLabel}
            </Button>
          </CardActions>
        </Card>
      </div>
    </form>
  );
}

export default BasicForm;
