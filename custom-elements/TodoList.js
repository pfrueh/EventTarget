import todos from '../event-targets/Todos.js';

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.handleClick);
    todos.addEventListener('update', this.handleUpdate);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleClick);
    todos.removeEventListener('update', this.handleUpdate);
  }

  handleClick = (e) => {
    if (e.target.nodeName.toLowerCase() === 'button') {
      const todo = e.target.closest('li').firstElementChild.textContent;
      todos.remove(todo);
    }
  };

  handleUpdate = (e) => this.render(e.detail);

  render = (todos = []) => {
    this.shadowRoot.innerHTML = `
      <ul>
        ${todos
          .map(
            (todo) => `
              <li>
                <span>${todo}</span>
                <button>remove</button>
              </li>
            `
          )
          .join('')}
      </ul>
    `;
  };
}

customElements.define('todo-list', TodoList);
