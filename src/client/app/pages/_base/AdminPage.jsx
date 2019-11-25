import BasePage from './BasePage';


export default class extends BasePage {
  constructor(props) {
    super(props);
    window.historyz = props.history || window.historyz;
  }
}
