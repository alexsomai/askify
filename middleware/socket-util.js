import Rx from 'rx'
import io from 'socket.io-client'

const socket = io('//localhost:3001')
let subscribtion

export function subscribe(props) {
  const { questions, actions, room } = props

  const createStream$ = Rx.Observable
    .fromEvent(socket, 'question:create')
    .filter(item => item.room === room)
  const voteStream$ = Rx.Observable
    .fromEvent(socket, 'question:vote')
    .filter(item => item.room === room)
  const doneStream$ = Rx.Observable
    .fromEvent(socket, 'question:done')
    .filter(item => item.room === room)

  const action$ = Rx.Observable.merge(
    createStream$.map(actions.addQuestion),
    voteStream$.map(actions.voteQuestion),
    doneStream$.map(actions.doneQuestion)
  )

  subscribtion = action$.subscribe(questions.dispatch)
}

export function unsubscribe() {
  subscribtion.dispose()
}
