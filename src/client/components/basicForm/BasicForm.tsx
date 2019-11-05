import React from 'react';

import { Card, CardContent, CardActions, Button, TextField, Typography } from 'core';

import './basicForm.scss';

interface InputItem {
  label: string;
  type: string;
  value: any;
}

interface Props {
  titleLabel: string;
  buttonLabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputItems: InputItem[];
}

const BasicForm: React.FC<Props> = props => {
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
};

function renderInputs(
  inputItems: InputItem[],
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) {
  return inputItems.map((item, index) => {
    return (
      <TextField
        className="basic-form-textfield"
        key={`signup-${index}`}
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

export default BasicForm;
