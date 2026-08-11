import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';

const estadoInicial = {
  nome: '',
  email: '',
  telefone: '',
  cargo: '',
};

function FuncionarioForm({ funcionario, onSubmit, onCancel, erros }) {
  const [formulario, setFormulario] = useState(estadoInicial);

  useEffect(() => {
    if (funcionario) {
      setFormulario({
        nome: funcionario.nome || '',
        email: funcionario.email || '',
        telefone: funcionario.telefone || '',
        cargo: funcionario.cargo || '',
      });
    } else {
      setFormulario(estadoInicial);
    }
  }, [funcionario]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((estadoAtual) => ({
      ...estadoAtual,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(formulario);
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <DialogContent
        sx={{
          padding: '0 24px 20px '
        }}
      >
        <TextField
          fullWidth
          required
          label="Nome"
          name="nome"
          value={formulario.nome}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          type="email"
          label="E-mail"
          name="email"
          value={formulario.email}
          onChange={handleChange}
          margin="normal"
          error={!!erros.email}
          helperText={erros.email || ''}
        />

        <TextField
          fullWidth
          label="Telefone"
          name="telefone"
          value={formulario.telefone}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          label="Cargo"
          name="cargo"
          value={formulario.cargo}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            background: '#2f9e41'
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Box>
  );
}

export default FuncionarioForm;