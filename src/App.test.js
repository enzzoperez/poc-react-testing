import React from 'react';
import { render, screen, cleanup, wait } from '@testing-library/react';
import user from "@testing-library/user-event";
import App from './App';

const taskToAdd = 'one task'

const renderToTest = () => {
  const utils = render(<App />)
    const inputTask = screen.getByPlaceholderText('ingrese', {exact: false})
    const buttonAdd = screen.getByRole('button', {name: 'Agregar tarea'})
    return {
      utils,
      inputTask,
      buttonAdd
    }
}

test('add a task', () => {
    render(<App />)
    const inputTask = screen.getByPlaceholderText('ingrese', {exact: false})
    const buttonAdd = screen.getByRole('button', {name: 'Agregar tarea'})

    expect(screen.getByText('ingrese', {exact: false})).toBeInTheDocument()
    expect(buttonAdd).toBeDisabled()
    
    user.type(inputTask, taskToAdd)
    expect(buttonAdd).toBeEnabled()

    user.click(buttonAdd)
    
    expect(inputTask.textContent).toBe('')
    expect(screen.getByText('tareas agregadas', {exact: false})).toHaveTextContent('1')
})

test('Testing doesnt allow more than 10 task', async() => {
    render(<App />)
    const inputTask = screen.getByPlaceholderText('ingrese', {exact: false})
    const buttonAdd = screen.getByRole('button', {name: 'Agregar tarea'})
    
    await wait(()=>{
      for (let index = 0; index < 11; index++) {
        user.type(inputTask, `${index}a`)
        expect(buttonAdd).toBeEnabled()
        user.click(buttonAdd)
      }
    })

    expect(screen.getByText('tareas agregadas', {exact: false})).toHaveTextContent('10')
    
    user.type(inputTask, `11 tarea`)
    expect(buttonAdd).toBeEnabled()
    user.click(buttonAdd)

    expect(screen.getByText('tareas agregadas', {exact: false})).toHaveTextContent('10')
})

test('Test Delete Button', () => {
  const {utils, buttonAdd, inputTask} = renderToTest()

  user.type(inputTask, taskToAdd)
  user.click(buttonAdd)

  expect(utils.getByText('tareas agregadas', {exact: false})).toHaveTextContent('1')

  const deleteButton = utils.getByRole('button', {name: 'Eliminar'})
  user.click(deleteButton)

  expect(utils.getByText('tareas agregadas', {exact: false})).toHaveTextContent('0')
})


