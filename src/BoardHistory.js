import React from 'react';

export default class BoardHistory extends React.Component {
  renderCurrentItem(index) {
    return(
      <li>
        Step #{index}
      </li>
    );
  }

  renderNotCurrentItem(index) {
    return(
      <li>
        <button onClick={() => { this.props.onClick(index) } }>
            Go to step #{index}
        </button>
      </li>
    );
  }

  renderItems() {
    return this.props.boardHistory.map( (item, index) => {
      return this.props.currentStep === index ? this.renderCurrentItem(index) : this.renderNotCurrentItem(index);
    });
  }

  render() {  
    return (
      <div>
        <ol>
          {this.renderItems()}
        </ol>
      </div>
    );
  }
}

