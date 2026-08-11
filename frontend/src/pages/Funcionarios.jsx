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
import Swal from 'sweetalert2';

import api from '../services/api';
import FuncionarioTable from '../components/funcionarios/FuncionarioTable';
import FuncionarioForm from '../components/funcionarios/FuncionarioForm';

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [erros, setErros] = useState({});

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
        setErros({});

        const response = await api.put(`funcionarios/${funcionarioSelecionado.id}/`, dados);

        setTimeout(() => {
          if (response.status === 200) {
            Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            }).fire({
              icon: "success",
              title: "Cadastro editado com sucesso!"
            });
          }
        }, 800);
      } else {
        const response = await api.post('funcionarios/', dados);

        setTimeout(() => {
          if (response.status === 201) {
            Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            }).fire({
              icon: "success",
              title: "Funcionário cadastrado com sucesso!"
            });
          }
        }, 800);
      }

      await carregarFuncionarios();
      handleFecharModal();
    } catch (error) {
      if (error.response?.status === 400) {
        setErros({
          email: error.response.data.email?.[0],
        });
      }
    }
  }

  async function handleExcluirFuncionario(id) {
    const conf = await Swal.fire({
      title: 'ATENÇÃO',
      text: 'Você está prestes a excluir este funcionário. Deseja continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2f9e41',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Não',
    });

    if (!conf.isConfirmed) return;

    try {
      const response = await api.delete(`funcionarios/${id}/`);

      if (response.status === 204) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "success",
          title: "Funcionário excluido com sucesso!"
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'Erro!',
        text: error?.message || 'Ocorreu um erro ao ecluir este funcionário.',
        icon: 'error',
      });
    } finally {
      await carregarFuncionarios();
    }
  }

  function handleFecharModal() {
    setOpenModal(false);
    setFuncionarioSelecionado(null);
    setErros({})
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
          erros={erros}
        />
      </Dialog>
    </Container >
  );
}

export default Funcionarios;