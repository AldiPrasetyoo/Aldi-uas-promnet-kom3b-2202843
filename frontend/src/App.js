import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch }
  from 'react-router-dom'
import daftarPeminjam from './components/daftarPeminjam';
import Navbar from './components/navbar';
import buatPeminjam from './components/buatPeminjam';
import detailPeminjam from './components/detailPeminjam';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component=
            {daftarPeminjam}></Route>
          <Route path="/inventory" component=
            {daftarPeminjam}></Route>
          <Route path="/tambahPeminjam/:id" component=
            {buatPeminjam}></Route>
          <Route path="/lihatPeminjam/:id" component=
            {detailPeminjam}></Route>
        </Switch>
      </Router>
      <ToastContainer />
    </div>

  );
}

export default App;
