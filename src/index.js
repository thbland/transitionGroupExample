import React from 'react';
import { render } from 'react-dom';
import {
  Transition,
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './index.css';

const styles = {
  fontFamily: 'sans-serif',
};

const timeout = 300;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProp: false,
      items: [1],
    };
  }

  render() {
    const { inProp, items } = this.state;
    return (
      <div style={styles}>
        <button
          type="button"
          onClick={() => {
            this.setState(state => ({
              inProp: !state.inProp,
            }));
          }}
        >
          Toggle <code>in</code> prop
        </button>

        <Transition in={inProp} timeout={timeout}>
          {state => (
            <div>
              <code>Transition</code> state: {state}
            </div>
          )}
        </Transition>

        <CSSTransition in={inProp} timeout={timeout} classNames="fade">
          {state => (
            <div className="fade">
              <code>CSSTransition</code> state: {state}
            </div>
          )}
        </CSSTransition>

        <button
          type="button"
          onClick={() => {
            this.setState(state => ({
              items: [
                ...state.items,
                state.items.length > 0
                  ? state.items[state.items.length - 1] + 1
                  : 1,
              ],
            }));
          }}
        >
          + Add item
        </button>
        <button
          type="button"
          onClick={() => {
            this.setState(state => ({
              items: state.items.slice(0, -1),
            }));
          }}
        >
          - Remove item
        </button>
        <TransitionGroup>
          {items.map(i => (
            <CSSTransition key={i} timeout={timeout} classNames="fade">
              <div>Item {i}</div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
