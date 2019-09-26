import React from 'react';

class Global {
  static init() {
    this.state = {};
    this.listeners = {};
  }

  static useState(name, initialValue) {
    const [newState, newSetState] = React.useState(this.state[name] || initialValue);
    const isNewState = !(name in this);
    if (isNewState) {
      this.listeners[name] = new Set();
    }
    React.useEffect(() => {
      this.listeners[name].add(newSetState);
      return () => this.listeners[name].delete(newSetState);
    }, []);
    if (!isNewState) {
      return this.state[name];
    }

    this.state[name] = newState;

    Object.defineProperty(this, name, {
      get: function _get() {
        return this.state[name];
      },
      set: function _set(value) {
        this.setState(name, value);
      }
    });

    return newState;
  }

  static setState(name, value) {
    if (!(name in this.state)) {
      return;
    }
    this.state[name] = value;
    this.listeners[name].forEach(listener => listener(value));
    this.saveState();
  }

  static removeState(name) {
    this.setState(name, undefined);
    delete this.state[name];
    delete this.listeners[name];
  }

  static resetState(name, initialValue) {
    this.removeState(name);
    return this.useState(name, initialValue);
  }

  static clearState() {
    this.init();
  }

  static saveState() {
    localStorage.setItem('GlobalState', JSON.stringify(this.state));
  }

  static loadState() {
    const savedState = localStorage.getItem('GlobalState');
    if (savedState != null) {
      try {
        const parsedState = JSON.parse(savedState);
        if (typeof parsedState === 'object') {
          Object.assign(this.state, parsedState);
        }
      } catch (e) {
        //
      }
    }
  }
}

export default Global;
