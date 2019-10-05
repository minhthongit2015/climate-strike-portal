import React from 'react';

class Global {
  static init() {
    this.state = {};
    this.listeners = {};
  }

  static useState(name, initialValue, classComponent) {
    let newState;
    let newSetState;
    if (classComponent) {
      newState = this.state[name]
        || (classComponent.state ? classComponent.state[name] : null)
        || initialValue;
      newSetState = value => classComponent.setState({
        [name]: value
      });
    } else {
      [newState, newSetState] = React.useState(this.state[name] || initialValue);
    }
    const isNewState = !(name in this);
    if (isNewState) {
      this.listeners[name] = new Set();
    }

    if (classComponent) {
      if (!classComponent._componentDidMount) {
        classComponent._componentDidMount = new Set();
        classComponent.componentDidMount = (...args) => {
          classComponent._componentDidMount.forEach(
            callback => callback.apply(classComponent, args)
          );
        };
        classComponent._componentWillUnmount = new Set();
        classComponent.componentWillUnmount = (...args) => {
          classComponent._componentWillUnmount.forEach(
            callback => callback.apply(classComponent, args)
          );
        };
      }
      classComponent._componentDidMount.add(() => {
        this.listeners[name].add(newSetState);
      });
      classComponent._componentWillUnmount.add(() => {
        this.listeners[name].delete(newSetState);
      });
    } else {
      React.useEffect(() => {
        this.listeners[name].add(newSetState);
        return () => this.listeners[name].delete(newSetState);
      }, []);
    }

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
    // if (!(name in this.state)) {
    //   return;
    // }
    this.state[name] = value;
    if (this.listeners[name]) {
      this.listeners[name].forEach(listener => listener(value));
    }
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
