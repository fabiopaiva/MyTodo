// @flow

export type Todo = {
  id?: string,
  text: string,
  completed?: boolean,
  priority: 0 | 1 | 2 | 3 | 4,
  dueTime?: string,
}
