import { createSignal, For } from 'solid-js'

export default function Schedule(userid: any, password: any) {

  const temp_data = [
    {time: 8},
    {time: 4},
    {time: 2},
  ]

  return (
    <>
      <For each={temp_data}>
        {(item) => (
          <div>{item.time}</div>
        )}
      </For>
    </>
  )
}

