import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { PageLayout } from '../layouts';
import { Movement } from '../types';
import useAuth from '../hooks/useAuth';
import Operations from './Operations';

const Movements = () => {
  const { token } = useAuth();
  const [movements, setMovements] = useState<Movement[]>([]);
  useEffect(() => {
    const getMovements = async () => {
      const listUrl = `http://localhost:3001/movements/list`;
      const axiosConfig: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(listUrl, axiosConfig);
        setMovements(data);
      } catch (error) {
        console.error(error);
      }
    };

    token && getMovements();
  }, []);

  const onUpdate = (movement: Movement) => {
    setMovements((_movements) => [..._movements, movement]);
  };

  return (
    <PageLayout width='md'>
      <h1>Movements</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWith: 650 }} aria-label='movements'>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!movements.length &&
              movements.map((movement) => {
                const { id, date, amount, balance } = movement;
                return (
                  <TableRow key={id}>
                    <TableCell>{date}</TableCell>
                    <TableCell align='right'>{amount}</TableCell>
                    <TableCell align='right'>{balance}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Operations onChange={(newMovement) => onUpdate(newMovement)} />
    </PageLayout>
  );
};

export default Movements;
