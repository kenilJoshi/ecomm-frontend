import React, {useContext} from 'react'
import CartContext from '../../../Context/CartContext'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

function TableCart() {

    const cartCtx = useContext(CartContext)

    const decrement = (id) => {
        if (id) {
          cartCtx.removeItem(id)
        }
      }
    
      const increment = (id) => {
        const item = cartCtx.items.filter((item) => item.id == id)
        if (item.length !== 0) {
          cartCtx.addItem(item[0])
        }
      }

  return (
    <TableContainer component={Paper} className='h-full'>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Products</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartCtx.items.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div className='flex gap-11'>
                          <Avatar alt="Remy Sharp" src={item.image} />
                          {item.title}
                        </div>
                      </TableCell>

                      <TableCell align="center" className='!flex gap-6 items-center justify-center'>
                        <button onClick={() => decrement(item.id)} className='h-8 w-8 rounded-full text-center text-white bg-purple-700 font-bold hover:bg-white hover:border-2 hover:border-solid hover:border-purple-700 hover:text-purple-700 text-xl'>-</button>
                        <span>
                          {item.quantities}
                        </span>
                        <button onClick={() => increment(item.id)} className='h-8 w-8 rounded-full text-center text-white bg-purple-700 font-bold hover:bg-white hover:border-2 hover:border-solid hover:border-purple-700 hover:text-purple-700 text-xl'>+</button>
                      </TableCell>

                      <TableCell align="center" >
                        {item.prices}
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
  )
}

export default TableCart