import React, {Component, useState} from 'react';
import './App.scss';

const TALENT_LIMIT = 6;

const isDesktop = window.innerHeight >= 900;

const LoadoutItem = props => {
  const {
    item,
    selected,
    handleEvent,
    index
  } = props;

  const className = selected ? 'lit' : '';

  const eventHandler = e => handleEvent(e, index);

  return (
    <div className="flex-container">
      {index > 0 && <img className="line" src={`/images/${selected ? '' : 'un'}selectedline.png`} />}
      <span onClick={eventHandler} onContextMenu={eventHandler}>
        <img className={className} src={`/images/${item}${selected ? 'lit' : ''}.png`} />
      </span>
    </div>
  );
}

const LoadoutList = props => {
  const {
    list,
    setPoints,
    index,
    pointsSpent
  } = props;

  const [selectedArr, setSelectedArr] = useState(new Array(list.length).fill(false));

  const setSelectedArrIdx = (idx, val) => {
    setSelectedArr([
      ...selectedArr.slice(0, idx),
      val,
      ...selectedArr.slice(idx + 1)
    ]);
  };

  const handleEvent = (e, idx) => {
    debugger;
    e.preventDefault();
    const {type} = e;
    if (type === 'click') {
      if (
        pointsSpent < TALENT_LIMIT &&
        !selectedArr[idx] && 
        (idx === 0 || selectedArr[idx - 1])
      ) {
        setPoints(pointsSpent + 1);
        setSelectedArrIdx(idx, true);
      }
    } else if (type === 'contextmenu') {
      if (
        pointsSpent > 0 &&
        selectedArr[idx] &&
        (idx === list.length || !selectedArr[idx + 1])
      ) {
        setPoints(pointsSpent - 1);
        setSelectedArrIdx(idx, false);
      }
    }
  };

  return (
    <div className="flex-container">
      <h5>Talent Path {index + 1}</h5>
      {list.map((item, idx) => 
        <LoadoutItem
          key={idx}
          item={item}
          index={idx}
          selected={selectedArr[idx]}
          handleEvent={handleEvent}
        />
      )}
    </div>
  );
}

class App extends Component {
  state = {
    loadoutLists: [
      ['stack', 'cutlery', 'cake', 'crown'],
      ['triangle', 'scuba', 'lightning', 'skull']
    ],
    pointsSpent: 0
  };

  setPoints = pointsSpent => {
    this.setState({pointsSpent});
  }

  render() {
    return (
      <div className="App">
        <h2>TitanStar Legends - Rune MasteryLoadout Talent Calculator 9000</h2>
        <div className="flex-container">
          <div className="flex-list-container">
            {this.state.loadoutLists.map((list, index) => 
              <LoadoutList
                key={index}
                index={index}
                list={list} 
                setPoints={this.setPoints}
                pointsSpent={this.state.pointsSpent}
              />
            )}
          </div>
          <div className="points-spent">
            Points Spent: 
            <div className="points-spent--numbers">{this.state.pointsSpent}/{TALENT_LIMIT}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
