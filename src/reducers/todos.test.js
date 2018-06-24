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
        id: 1,
        text: 'Run the tests',
      }),
    ).toEqual({
      items: [{
        text: 'Run the tests',
        completed: false,
        id: 1,
      }],
    })

    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 1,
          },
        ],
      },
      {
        type: types.TODO_ADD,
        text: 'Run the tests',
        id: 2,
      }),
    ).toEqual({
      items: [
        {
          text: 'Run the tests',
          completed: false,
          id: 2,
        },
        {
          text: 'Use Redux',
          completed: false,
          id: 1,
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
            id: 1,
          },
        ],
      },
      {
        type: types.TODO_REMOVE,
        id: 1,
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
            id: 1,
          },
        ],
      },
      {
        type: types.TODO_UPDATE,
        text: 'Use Redux updated',
        id: 1,
      }),
    ).toEqual({
      items: [
        {
          text: 'Use Redux updated',
          completed: false,
          id: 1,
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
            id: 1,
          },
        ],
      },
      {
        type: types.TODO_TOGGLE,
        id: 1,
      }),
    ).toEqual({
      items: [
        {
          text: 'Use Redux',
          completed: true,
          id: 1,
        },
      ],
    })

    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: true,
            id: 1,
          },
        ],
      },
      {
        type: types.TODO_TOGGLE,
        id: 1,
      }),
    ).toEqual({
      items: [
        {
          text: 'Use Redux',
          completed: false,
          id: 1,
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
            id: 1,
          },
          {
            text: 'Finish assignment',
            completed: false,
            id: 2,
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
          id: 1,
        },
        {
          text: 'Finish assignment',
          completed: true,
          id: 2,
        },
      ],
    })

    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: true,
            id: 1,
          },
          {
            text: 'Finish assignment',
            completed: true,
            id: 2,
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
          id: 1,
        },
        {
          text: 'Finish assignment',
          completed: false,
          id: 2,
        },
      ],
    })

    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 1,
          },
          {
            text: 'Finish assignment',
            completed: true,
            id: 2,
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
          id: 1,
        },
        {
          text: 'Finish assignment',
          completed: true,
          id: 2,
        },
      ],
    })
  })
})
