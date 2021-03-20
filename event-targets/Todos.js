class Todos extends EventTarget {
  constructor() {
    super();
    this.todos = [];
  }

  add = (todo) => {
    this.todos = [...this.todos, todo];
    this.dispatchEvent(new CustomEvent('update', { detail: this.todos }));
  };

  remove = (todo) => {
    this.todos = this.todos.filter((t) => t !== todo);
    this.dispatchEvent(new CustomEvent('update', { detail: this.todos }));
  };
}

export default new Todos();
