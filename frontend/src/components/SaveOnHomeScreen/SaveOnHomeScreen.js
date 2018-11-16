import React, { Component } from 'react';
import { SaveOnHomeScreenContainer } from './style';

class SaveOnHomeScreen extends Component {
  render() {
    return (
      <SaveOnHomeScreenContainer>
        <h2>Installera 20 Frågor</h2>
        <p>Installera appen på din hemskärm så blir spelet mycket roligare!</p>
        <p>Tryck bara på <img src={require('./share.svg')} alt=""/> och sen "Lägg till på hemskärm"</p>
      </SaveOnHomeScreenContainer>
    )
  }
}

export default SaveOnHomeScreen;
