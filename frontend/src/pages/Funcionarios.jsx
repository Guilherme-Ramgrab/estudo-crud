import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import api from '../services/api';
import FuncionarioTable from '../components/funcionarios/FuncionarioTable';
import FuncionarioForm from '../components/funcionarios/FuncionarioForm';

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  async function carregarFuncionarios() {
    try {
      const response = await api.get('funcionarios/');
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
    }
  }

  function handleNovoFuncionario() {
    setFuncionarioSelecionado(null);
    setOpenModal(true);
  }

  function handleEditarFuncionario(funcionario) {
    setFuncionarioSelecionado(funcionario);
    setOpenModal(true);
  }

  async function handleSalvarFuncionario(dados) {
    try {
      if (funcionarioSelecionado) {
        await api.put(
          `funcionarios/${funcionarioSelecionado.id}/`,
          dados
        );
      } else {
        await api.post('funcionarios/', dados);
      }

      await carregarFuncionarios();
      handleFecharModal();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
    }
  }

  function handleExcluirFuncionario(funcionario) {
    console.log('Excluir funcionário:', funcionario);
  }

  function handleFecharModal() {
    setOpenModal(false);
    setFuncionarioSelecionado(null);
  }

  return (
    <Container maxWidth="lg"
      sx={{
        width: '1126px',
        maxWidth: '100%',
        margin: '0 auto',
        textAlign: 'center',
        minHeight: '90svh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#fffffff6",
        borderRadius: 4,
        padding: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold'
          }}
        >
          FUNCIONÁRIOS
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNovoFuncionario}
          sx={{
            background: '#2f9e41'
          }}
        >
          Novo Funcionário
        </Button>
      </Box>

      <FuncionarioTable
        funcionarios={funcionarios}
        onEdit={handleEditarFuncionario}
        onDelete={handleExcluirFuncionario}
      />

      <Dialog
        open={openModal}
        onClose={handleFecharModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '40px'
          }}
        >
          {funcionarioSelecionado
            ? 'Editar Funcionário'
            : 'Novo Funcionário'}
        </DialogTitle>

        <FuncionarioForm
          funcionario={funcionarioSelecionado}
          onSubmit={handleSalvarFuncionario}
          onCancel={handleFecharModal}
        />
      </Dialog>
    </Container >
  );
}

export default Funcionarios;