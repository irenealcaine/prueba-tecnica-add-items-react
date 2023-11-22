
import React, { useState } from 'react'
import './App.css'

type ItemId = string

interface Item {
  id: ItemId
  timestamp: number
  text: string
}

// const INITIAL_ITEMS: Item[] = [
//   {
//     id: crypto.randomUUID(), //objeto nativo para crear id's
//     timestamp: Date.now(), //mejor que new Date()
//     text: "aaaaaaa"
//   }, {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: "eeeeeeeeeeeee"
//   },
// ]

function App() {

  const [items, setItems] = useState<Item[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget
    const input = elements.namedItem("item") //asegurarse de que es u input
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now()
    }

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })

    input.value = ''
  }

  // const createHandleRemoveItem = (id: ItemId) => () => {
  //   setItems(prevItems => {
  //     return prevItems.filter(currentItem => currentItem.id !== id)
  //   })
  // }

  return (
    <main>
      <aside>
        <h1>Prueba técnica</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>
        <form onSubmit={handleSubmit} aria-label="Añadir elementos a la lista">
          <label htmlFor="">
            Elemento  a introducir:
            <input
              type="text"
              name='item'
              required
              placeholder='Introduce el elemento'
            />
            <button>Añadir</button>
          </label>
        </form>
      </aside>
      <section>
        <h2>Lista de elementos</h2>

        {items.length === 0

          ? (
            <p>No hay elementos</p>

          ) : (
            <ul>
              {
                items.map(item => { //importante! evitar usar el index como key
                  return (
                    <li key={item.id}>
                      {item.text}
                      <button
                        onClick={() => {
                          setItems(prevItems => {
                            return prevItems.filter(currentItem => currentItem.id !== item.id)
                          })

                          //createHandleRemoveItem(item.id) //otra opción, se separa el bloque de función
                        }}
                      >
                        Eliminar
                      </button>
                    </li>
                  )
                })}
            </ul>
          )
        }

      </section>
    </main>
  )
}

export default App
