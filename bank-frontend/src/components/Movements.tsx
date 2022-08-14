import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PageLayout } from '../layouts';
import { Movement } from '../types';

const Movements = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  useEffect(() => {
    const getMovements = async () => {
      const listUrl = `http://localhost:3001/movements/list`;

      try {
        const { data } = await axios.get(listUrl);
      } catch (error) {
        console.error(error);
      }
    };

    getMovements();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWith: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map((movement) => {
            const { id, date, amount, balance } = movement;
            return (
              <TableRow key={id}>
                <TableRow>{date}</TableRow>
                <TableRow>{amount}</TableRow>
                <TableRow>{balance}</TableRow>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <h1>Movements</h1>
    </TableContainer>
  );
};

export default Movements;
