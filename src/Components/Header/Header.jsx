import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../../Context/AuthContext';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartContext from '../../Context/CartContext';

const StyledBadge = styled(Badge) (({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userCtx = useContext(UserContext)
  const cartCtx = useContext(CartContext)

  const logout = () => {
    userCtx.logout()
  }

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <div className="flex items-center justify-around py-5">
        <div>
          <Link to="/"><h1 className='font-bold text-3xl text-gray-700'>Logo</h1></Link>
        </div>
        <div className='flex gap-17'>
          <NavLink to="/" className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-purple-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-purple-700 font-medium lg:p-0`
          }
          ><h1>Home</h1></NavLink>
          <NavLink to="/about" className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-purple-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-purple-700 font-medium lg:p-0`
          }><h1>About</h1></NavLink>
          <NavLink to="/category" className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-purple-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-purple-700 font-medium lg:p-0`
          }><h1>Category</h1></NavLink>
        </div>

        {
          userCtx.isAuthenticated ?
            <div className='flex gap-5 items-center'>
              <Link to="/cart">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cartCtx.items.length} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Link>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <Link to="/orders"><MenuItem onClick={handleClose}>Orders</MenuItem></Link>
                <Link to="/wishlist"><MenuItem onClick={handleClose}>Wishlist</MenuItem></Link>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
            :
            <div className='flex gap-5 items-center'>
              <Link to="/signin" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"><h1>Login</h1></Link>
            </div>
        }

      </div>
    </header>
  )
}

export default Header