import Rx from 'rx'
import io from 'socket.io-client'

const socket = io()
let subscribtion

export function subscribe(props) {
  const { questions, actions, room } = props

  const createStream$ = Rx.Observable
    .fromEvent(socket, 'question:create')
    .filter(item => item.room === room)
  const updateStream$ = Rx.Observable
    .fromEvent(socket, 'question:update')
    .filter(item => item.room === room)

  const action$ = Rx.Observable.merge(
    createStream$.map(actions.addQuestion),
    updateStream$.map(actions.voteQuestion)
  )

  subscribtion = action$.subscribe(questions.dispatch)
}

export function unsubscribe() {
  subscribtion.dispose()
}
