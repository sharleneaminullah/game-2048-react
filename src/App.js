import React from 'react';
import Header from './components/Header/Header';
import GameBoard from './components/GameBoard/GameBoard';

/* Top most component in the application
 * Contains all other components
 */

const App = () => {
    return (
        <div>
            <Header />
            <GameBoard /> 
        </div>
    );
  }

export default App;