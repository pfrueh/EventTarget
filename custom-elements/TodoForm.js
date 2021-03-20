import todos from '../event-targets/Todos.js';

class TodoForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <form>
        <input type="text" />
        <button type="submit">Add</button>
      </form>
    `;
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('submit', this.handleSubmit);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const input = this.shadowRoot.querySelector('input');
    if (!input.value) return;
    todos.add(input.value);
    input.value = '';
    input.focus();
  };
}

customElements.define('todo-form', TodoForm);
