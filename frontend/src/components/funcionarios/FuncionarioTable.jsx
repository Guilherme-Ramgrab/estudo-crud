import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const sxCelula = {
  color: '#fff',
  fontWeight: 'bold'
}

function FuncionarioTable({ funcionarios, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead
          sx={{
            background: '#036e15f5',
          }}
        >
          <TableRow>
            <TableCell sx={sxCelula}>
              NOME
            </TableCell>
            <TableCell sx={sxCelula}>
              E-MAIL
            </TableCell>
            <TableCell sx={sxCelula}>
              TELEFONE
            </TableCell>
            <TableCell sx={sxCelula}>
              CARGO
            </TableCell>
            <TableCell sx={sxCelula}>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {funcionarios.map((funcionario) => (
            <TableRow key={funcionario.id}>
              <TableCell>{funcionario.nome}</TableCell>
              <TableCell>{funcionario.email}</TableCell>
              <TableCell>{funcionario.telefone || '-'}</TableCell>
              <TableCell>{funcionario.cargo}</TableCell>

              <TableCell align="center">
                <Tooltip title="Editar">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(funcionario)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Excluir">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(funcionario)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FuncionarioTable;
