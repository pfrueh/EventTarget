import todos from '../event-targets/Todos.js';

class TodoStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    todos.addEventListener('update', this.handleUpdate);
  }

  disconnectedCallback() {
    todos.removeEventListener('update', this.handleUpdate);
  }

  handleUpdate = (e) => {
    const todos = e.detail;
    this.render(todos.length);
  };

  render = (numTodos = 0) => {
    this.shadowRoot.innerHTML = numTodos
      ? `You have ${numTodos} todo${numTodos > 1 ? 's' : ''} to do!`
      : 'You have no todos!';
  };
}

customElements.define('todo-status', TodoStatus);
