import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Header from './components/Header/Header';
import AddItems from './components/AddItems/AddItems';

const App = () => {
  return (
    <div>
      <Header/>
      <AddItems/>

    </div>
  )
}

export default App
