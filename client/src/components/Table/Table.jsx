import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Logger from '../../store/clickstreamLogger'

function createData(name, date, status) {
  return { name, date, status };
}

const rows = [
  createData("Integers Set 1", "2 June 2022", "Accepted"),
  createData("Algebra Set 2 ", "2 June 2022", "Pending"),
  createData("Ratio & Proportion Set 2", "2 June 2022", "Accepted"),
  createData("Integers Set 2", "1 June 2022", "Submitted"),
];



const makeStyle=(status)=>{
  if(status === 'Accepted')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const detailsOnClick=()=>{
    
    console.log(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on Details", "Navigated from HomePage to Recent Activity Video")
    Logger(cookies.session, cookies.user._id,cookies.user.username, "PageQuery: Clicked on Details", "Navigated from HomePage to Recent Activity Video")
    navigate('/player',);
  }

  return (
      <div className="Table">
      <h3>Recent Activity</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Assignment</TableCell>
                {/* <TableCell align="left">Session ID</TableCell> */}
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {/* <TableCell align="left">{row.trackingId}</TableCell> */}
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details" onClick={()=>{detailsOnClick()}}>Details</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
