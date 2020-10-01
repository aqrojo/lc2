import { observable, toJS } from 'mobx'
import ResponseModel from './ResponseModel'

export default function createStore(data) {
  const state = observable({
    steam: '',
    validResponse: [],
    isEvaluated: false,
    responses: [],

    get userResponse() {
      return this.responses.reduce((acc, next) => {
        return [...acc, ...(next.selected ? [next.text] : [])]
      }, [])
    },

    get result() {
      return this.userResponse.toString() === this.validResponse.toString()
    },

    get output() {
      return {
        steam: this.steam,
        responses: this.responses.map((response) => ({
          text: response.text
        })),
        validResponse: toJS(this.validResponse),
        userResponse: this.userResponse,
        result: this.result
      }
    },

    evaluate() {
      this.isEvaluated = true
    },

    reset() {
      this.responses.forEach((response) => response.reset())
      this.isEvaluated = false
    },

    create(data) {
      this.steam = data.steam
      this.validResponse = data.validResponse
      this.responses = data.responses.map(({ text }, idx) => {
        return ResponseModel({
          text,
          idx,
          parent: state
        })
      })
      this.isEvaluated = data.isEvaluated || false
    }
  })

  return state
}
