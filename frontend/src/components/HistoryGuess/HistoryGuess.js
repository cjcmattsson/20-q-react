import React, { Component } from 'react';

class HistoryGuess extends Component {

  constructor(props) {
   super(props);
   this.historyItem = React.createRef();
 }

  componentDidMount() {
    this.io();
  }

  io = () => {
    const io = new IntersectionObserver(entries => {
      for(const entry of entries)
        console.log(`${entry.target.textContent} is in target: ${entry.isIntersecting}`);
    })
    const historyItem = this.historyItem.current;
    io.observe(historyItem);
  }

  render() {
    return (
      <div ref={this.historyItem} style={this.props.styleProps} className="historyGuess">
        <p style={{color: "white"}}>
        {this.props.content}
        </p>
      </div>
    )
  }
}

export default HistoryGuess;
