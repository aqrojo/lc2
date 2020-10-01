import { observable, toJS } from 'mobx'
import ResponseModel from './ResponseModel'

export default function createStore(data) {
  const state = observable({
    steam: '',
    validResponse: [],
    isEvaluated: false,
    responses: [],

    get userResponse() {
      return state.responses.reduce((acc, next) => {
        return [...acc, ...(next.selected ? [next.text] : [])]
      }, [])
    },

    get result() {
      return state.userResponse.toString() === state.validResponse.toString()
    },

    get output() {
      return {
        steam: state.steam,
        responses: state.responses.map((response) => ({
          text: response.text
        })),
        validResponse: toJS(state.validResponse),
        userResponse: state.userResponse,
        result: state.result
      }
    },

    evaluate() {
      state.isEvaluated = true
    },

    reset() {
      state.responses.forEach((response) => response.reset())
      state.isEvaluated = false
    },

    create(_data) {
      console.log('data??', _data)
      state.steam = _data.steam
      state.validResponse = _data.validResponse
      state.responses = _data.responses.map(({ text }, idx) => {
        return ResponseModel({
          text,
          idx,
          parent: state
        })
      })
      state.isEvaluated = _data.isEvaluated || false
    }
  })
  state.create(data)
  return state
}
