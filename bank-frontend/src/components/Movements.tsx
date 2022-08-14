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
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    token && getMovements();
  }, []);

  return (
    <PageLayout width='md'>
      <h1>Movements</h1>
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
            {!!movements.length &&
              movements.map((movement) => {
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
      </TableContainer>
    </PageLayout>
  );
};

export default Movements;
