// @flow
import reducer from './todos'
import types from '../constants/ActionTypes'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      items: [],
      synced: false,
    })
  })

  it('should handle TODO_ADD', () => {
    expect(
      reducer(undefined, {
        type: types.TODO_ADD,
        todo: {
          id: 'abc',
          text: 'Run the tests',
          priority: 0,
        },
      }),
    ).toEqual({
      items: [{
        text: 'Run the tests',
        id: 'abc',
        priority: 0,
      }],
      synced: false,
    })

    expect(
      reducer({
        items: [
          {
            text: 'Use Redux',
            id: 'abc',
            priority: 0,
          },
        ],
        synced: false,
      },
      {
        type: types.TODO_ADD,
        todo: {
          text: 'Run the tests',
          id: 'def',
          priority: 0,
        },
      }),
    ).toEqual({
      synced: false,
      items: [
        {
          text: 'Run the tests',
          id: 'def',
          priority: 0,
        },
        {
          text: 'Use Redux',
          id: 'abc',
          priority: 0,
        },
      ],
    })
  })

  it('should handle TODO_REMOVE', () => {
    expect(
      reducer({
        synced: false,
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
            priority: 0,
          },
        ],
      },
      {
        type: types.TODO_REMOVE,
        id: 'abc',
      }),
    ).toEqual({
      synced: false,
      items: [],
    })
  })

  it('should handle TODO_UPDATE', () => {
    expect(
      reducer({
        synced: false,
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
            priority: 0,
          },
        ],
      },
      {
        type: types.TODO_UPDATE,
        text: 'Use Redux updated',
        id: 'abc',
        priority: 0,
      }),
    ).toEqual({
      synced: false,
      items: [
        {
          text: 'Use Redux updated',
          completed: false,
          id: 'abc',
          priority: 0,
        },
      ],
    })
  })

  it('should handle TODO_TOGGLE', () => {
    expect(
      reducer({
        synced: false,
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
            priority: 0,
          },
        ],
      },
      {
        type: types.TODO_TOGGLE,
        id: 'abc',
        priority: 0,
      }),
    ).toEqual({
      synced: false,
      items: [
        {
          text: 'Use Redux',
          completed: true,
          id: 'abc',
          priority: 0,
        },
      ],
    })

    expect(
      reducer({
        synced: false,
        items: [
          {
            text: 'Use Redux',
            completed: true,
            id: 'abc',
            priority: 0,
          },
        ],
      },
      {
        type: types.TODO_TOGGLE,
        id: 'abc',
        priority: 0,
      }),
    ).toEqual({
      synced: false,
      items: [
        {
          text: 'Use Redux',
          completed: false,
          id: 'abc',
          priority: 0,
        },
      ],
    })
  })

  it('should handle TODO_SET_ALL_STATUS', () => {
    expect(
      reducer({
        synced: false,
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
            priority: 0,
          },
          {
            text: 'Finish assignment',
            completed: false,
            id: 'def',
            priority: 0,
          },
        ],
      },
      {
        type: types.TODO_SET_ALL_STATUS,
        completed: true,
        priority: 0,
      }),
    ).toEqual({
      synced: false,
      items: [
        {
          text: 'Use Redux',
          completed: true,
          id: 'abc',
          priority: 0,
        },
        {
          text: 'Finish assignment',
          completed: true,
          id: 'def',
          priority: 0,
        },
      ],
    })

    expect(
      reducer({
        synced: false,
        items: [
          {
            text: 'Use Redux',
            completed: true,
            id: 'abc',
            priority: 0,
          },
          {
            text: 'Finish assignment',
            completed: true,
            id: 'def',
            priority: 0,
          },
        ],
      },
      {
        type: types.TODO_SET_ALL_STATUS,
        completed: false,
        priority: 0,
      }),
    ).toEqual({
      synced: false,
      items: [
        {
          text: 'Use Redux',
          completed: false,
          id: 'abc',
          priority: 0,
        },
        {
          text: 'Finish assignment',
          completed: false,
          id: 'def',
          priority: 0,
        },
      ],
    })

    expect(
      reducer({
        synced: false,
        items: [
          {
            text: 'Use Redux',
            completed: false,
            id: 'abc',
            priority: 0,
          },
          {
            text: 'Finish assignment',
            completed: true,
            id: 'def',
            priority: 0,
          },
        ],
      },
      {
        type: types.TODO_SET_ALL_STATUS,
        completed: true,
        priority: 0,
      }),
    ).toEqual({
      synced: false,
      items: [
        {
          text: 'Use Redux',
          completed: true,
          id: 'abc',
          priority: 0,
        },
        {
          text: 'Finish assignment',
          completed: true,
          id: 'def',
          priority: 0,
        },
      ],
    })
  })

  it('should handle TODO_CLEAR_COMPLETED', () => {
    expect(
      reducer({
        synced: false,
        items: [
          {
            text: 'Use Redux',
            completed: true,
            id: 'abc',
            priority: 0,
          },
          {
            text: 'Finish assignment',
            completed: false,
            id: 'def',
            priority: 0,
          },
        ],
      },
      {
        type: types.TODO_CLEAR_COMPLETED,
      }),
    ).toEqual({
      synced: false,
      items: [
        {
          text: 'Finish assignment',
          completed: false,
          id: 'def',
          priority: 0,
        },
      ],
    })
  })

  it('should handle TODO_ADD and order by priority', () => {
    expect(
      reducer({
        synced: false,
        items: [
          {
            text: 'Use Redux',
            id: 'abc',
            priority: 0,
          },
          {
            text: 'Use Redux right now',
            id: 'def',
            priority: 4,
          },
        ],
      },
      {
        type: types.TODO_ADD,
        todo: {
          text: 'Use Redux as soon as possible',
          id: 'ghi',
          priority: 3,
        },
      }),
    ).toEqual({
      synced: false,
      items: [
        {
          text: 'Use Redux right now',
          id: 'def',
          priority: 4,
        },
        {
          text: 'Use Redux as soon as possible',
          id: 'ghi',
          priority: 3,
        },
        {
          text: 'Use Redux',
          id: 'abc',
          priority: 0,
        },
      ],
    })
  })
})
