import React from 'react';

class ComboBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    return {
      'set_number': props.set_number,
      'current_combo': props.current_combo
    };
  }
  componentDidUpdate(prevProps, prevState) {
    let element = document.getElementById('moveList');
    if(element.lastChild){
        element.lastChild.scrollIntoView({'behavior': 'smooth'});
    }
  }
  render() {
    let combo_moves, display_set_number;
    display_set_number = this.state.set_number + 1
    if(this.state.current_combo) {
      combo_moves = this.state.current_combo.map((move, index) =>
        <li key={index}>{move}</li>
      );
    }
    return (
      <div id="comboBuilder" className="flex flex-col">
        <h1>Set {display_set_number}</h1>
        <div id="comboSandBox">
          <ol id="moveList" className="flex flex-col">{combo_moves}</ol>
        </div>
      </div>
    );
  }
}

export default ComboBuilder;
