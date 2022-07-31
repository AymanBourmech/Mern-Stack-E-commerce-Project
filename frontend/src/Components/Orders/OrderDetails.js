import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  root: {
    height: "20px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  root: {
    height: "20px",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function OrderDetails(props) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, maxHeight: 500, height: 500 }}
        aria-label="customized table"
      >
        <TableBody>
          {props.params.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="right" style={{ width: 60 }}>
                <img
                  style={{ height: 40, width: 60, borderRadius: "5%" }}
                  src={`data:image/image/png;base64,${row.id.imageartpetitf}`}
                  alt=""
                />
              </StyledTableCell>
              <StyledTableCell align="center" style={{ width: 100 }}>
                {row.designation}
              </StyledTableCell>
              <StyledTableCell align="right" style={{ width: 40 }}>
                {row.quantitiy}
              </StyledTableCell>
              <StyledTableCell align="right" style={{ width: 40 }}>
                {row.price.toFixed(3)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
