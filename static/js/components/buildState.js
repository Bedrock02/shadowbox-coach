import React from 'react';
import MoveLibrary from './moveLibrary.js';
import ComboBuilder from './comboBuilder.js';
import NavButtons from './navButtons.js';

class BuildState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'combos': [],
      'current_combo': [],
      'set_number_limit': 5,
      'current_set_number': 0,
      'handleBuildStateDone': this.props.handleBuildStateDone
    };
    this.handleMoveClick = this.handleMoveClick.bind(this);
    this.handleClearMove = this.handleClearMove.bind(this);
    this.handleNextMove = this.handleNextMove.bind(this);
    this.handlePrevMove = this.handlePrevMove.bind(this);
    this.nextCurrentCombo = this.nextCurrentCombo.bind(this);
    this.saveComboList = this.saveComboList.bind(this);
  }
  handleMoveClick(e) {
    let move = e.currentTarget.innerText.trim();
    let current_combo = this.state.current_combo;
    current_combo.push(move);
    this.setState({'current_combo': current_combo});
  }
  handleClearMove(e) {
    if(this.state.current_combo.length <=0) {
      return;
    }
    let current_combo = this.state.current_combo;
    current_combo.pop();
    this.setState({'current_combo': current_combo});
  }
  handleNextMove(e) {
    let empty_combo_list, empty_current_combo, end_of_combo_list, combos, new_current_combo;
    empty_combo_list = this.state.combos === undefined || this.state.combos.length == 0;
    empty_current_combo = this.state.current_combo == undefined || this.state.current_combo.length == 0;
    end_of_combo_list = this.state.current_set_number == this.state.combos.length;
    // Do nothing if everything is empty
    // Do nothing if end of combo list and no current combo
    if(empty_combo_list && empty_current_combo || end_of_combo_list && empty_current_combo) {
      return;
    }
    combos = this.state.combos;
    combos = this.saveComboList(this.state.combos)
    new_current_combo = this.nextCurrentCombo(this.state.current_set_number + 1);

    // Reached The End
    if(this.state.combos.length >= this.state.set_number_limit + 1) {
      this.setState({'combos': combos});
      this.state.handleBuildStateDone(this.state.combos);
      return;
    }

    this.setState({
      'combos': combos,
      'current_combo': new_current_combo,
      'current_set_number': this.state.current_set_number + 1
    });
  }
  handlePrevMove(e) {
    let next_set_number, combos, new_set_number;
    combos = this.saveComboList(this.state.combos)
    new_set_number = this.state.current_set_number - 1;
    new_set_number = ((new_set_number <= 0) ? 0 : new_set_number);

    this.setState({
      'current_set_number': new_set_number,
      'current_combo': this.nextCurrentCombo(new_set_number),
      'combos': combos
    });
  }
  nextCurrentCombo(next_set_number, combos) {
    let curr_combos = combos || this.state.combos;
    if(curr_combos == 0 || next_set_number >= this.state.combos.length) {
      return []
    }
    return curr_combos[next_set_number];
  }
  saveComboList(combos) {
    // Adding new combos
    // 1. Add at the end of list if we are at the end of list and current combo is not empty
    // 2. Replace at current index if not at the end of list
    let empty_combo_list, empty_current_combo, end_of_combo_list;
    empty_current_combo = this.state.current_combo == undefined || this.state.current_combo.length == 0;
    end_of_combo_list = this.state.current_set_number == this.state.combos.length;
    combos = this.state.combos;
    if(end_of_combo_list && !empty_current_combo) {
      combos.push(this.state.current_combo);
    }
    else {
      combos[this.state.current_set_number] = this.state.current_combo;
    }
    return combos
  }
  render() {
    return (
      <div>
        <ComboBuilder
          set_number={this.state.current_set_number}
          current_combo={this.state.current_combo}/>
        <MoveLibrary handleClick={this.handleMoveClick}/>
        <NavButtons
          handleClearMove={this.handleClearMove}
          handleNextMove={this.handleNextMove}
          handlePrevMove={this.handlePrevMove}/>
      </div>
    );
  }
}
export default BuildState;
