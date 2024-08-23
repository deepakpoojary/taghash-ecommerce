// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, CssBaseline, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import ReviewForm from './components/ReviewForm';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Reviews
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/submit-review" onClick={toggleDrawer(false)}>
            <ListItemText primary="Submit Review" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard" onClick={toggleDrawer(false)}>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </Drawer>

      <Container>
        <Routes>
          {/* Default route: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Submit Review route */}
          <Route path="/submit-review" element={<ReviewForm />} />

          {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
