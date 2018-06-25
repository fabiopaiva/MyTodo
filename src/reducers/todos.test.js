// @flow
import reducer from './todos'
import types from '../constants/ActionTypes'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      items: [],
    })
  })

  it('should handle TODO_ADD', () => {
    expect(
      reducer(undefined, {
        type: types.TODO_ADD,
        todo: {
          id: 'abc',
          text: 'Run the tests',
        },
      }),
    ).toEqual({
      items: [{
        text: 'Run the tests',
        id: 'abc',
      }],
    })

    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            id: 'abc',
          },
        ],
      },
      {
        type: types.TODO_ADD,
        todo: {
          text: 'Run the tests',
          id: 'def',
        },
      }),
    ).toEqual({
      items: [
        {
          text: 'Run the tests',
          id: 'def',
        },
        {
          text: 'Use Redux',
          id: 'abc',
        },
      ],
    })
  })

  it('should handle TODO_REMOVE', () => {
    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
          },
        ],
      },
      {
        type: types.TODO_REMOVE,
        id: 'abc',
      }),
    ).toEqual({
      items: [],
    })
  })

  it('should handle TODO_UPDATE', () => {
    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
          },
        ],
      },
      {
        type: types.TODO_UPDATE,
        text: 'Use Redux updated',
        id: 'abc',
      }),
    ).toEqual({
      items: [
        {
          text: 'Use Redux updated',
          completed: false,
          id: 'abc',
        },
      ],
    })
  })

  it('should handle TODO_TOGGLE', () => {
    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
          },
        ],
      },
      {
        type: types.TODO_TOGGLE,
        id: 'abc',
      }),
    ).toEqual({
      items: [
        {
          text: 'Use Redux',
          completed: true,
          id: 'abc',
        },
      ],
    })

    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: true,
            id: 'abc',
          },
        ],
      },
      {
        type: types.TODO_TOGGLE,
        id: 'abc',
      }),
    ).toEqual({
      items: [
        {
          text: 'Use Redux',
          completed: false,
          id: 'abc',
        },
      ],
    })
  })

  it('should handle TODO_SET_ALL_STATUS', () => {
    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
          },
          {
            text: 'Finish assignment',
            completed: false,
            id: 'def',
          },
        ],
      },
      {
        type: types.TODO_SET_ALL_STATUS,
        isCompleted: true,
      }),
    ).toEqual({
      items: [
        {
          text: 'Use Redux',
          completed: true,
          id: 'abc',
        },
        {
          text: 'Finish assignment',
          completed: true,
          id: 'def',
        },
      ],
    })

    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: true,
            id: 'abc',
          },
          {
            text: 'Finish assignment',
            completed: true,
            id: 'def',
          },
        ],
      },
      {
        type: types.TODO_SET_ALL_STATUS,
        isCompleted: false,
      }),
    ).toEqual({
      items: [
        {
          text: 'Use Redux',
          completed: false,
          id: 'abc',
        },
        {
          text: 'Finish assignment',
          completed: false,
          id: 'def',
        },
      ],
    })

    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
          },
          {
            text: 'Finish assignment',
            completed: true,
            id: 'def',
          },
        ],
      },
      {
        type: types.TODO_SET_ALL_STATUS,
        isCompleted: true,
      }),
    ).toEqual({
      items: [
        {
          text: 'Use Redux',
          completed: true,
          id: 'abc',
        },
        {
          text: 'Finish assignment',
          completed: true,
          id: 'def',
        },
      ],
    })
  })

  it('should handle TODO_CLEAR_COMPLETED', () => {
    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: true,
            id: 'abc',
          },
          {
            text: 'Finish assignment',
            completed: false,
            id: 'def',
          },
        ],
      },
      {
        type: types.TODO_CLEAR_COMPLETED,
      }),
    ).toEqual({
      items: [
        {
          text: 'Finish assignment',
          completed: false,
          id: 'def',
        },
      ],
    })
  })
})
