import { google } from 'googleapis'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// Create a client
const queryClient = new QueryClient()

export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const sheets = google.sheets({ version: 'v4', auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A2:B9',
  })
  const result = response.data.values

  const todos = result.map(([title = '', done = 'FALSE'], idx) => ({
    id: idx,
    title,
    done,
  }))
  console.log(todos)

  return {
    props: {
      todos: todos,
    },
  }
}

export default function Todo({ todos }) {
  return (
    <div>
      <h1>Todo</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button onClick={() => update()}>Add Todo</button>
    </div>
  )
}

async function update(...args) {
  // const auth = await google.auth.getClient({
  //   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  // })
  // const sheets = google.sheets({ version: 'v4', auth })

  // const response = await sheets.spreadsheets.values.get({
  //   spreadsheetId: process.env.SHEET_ID,
  //   range: 'Sheet1!A2:B9',
  // })
  // const result = response.data.values

  // const todos = result.map(([title = '', done = 'FALSE'], idx) => ({
  //   id: idx,
  //   title,
  //   done,
  // }))
  // console.log(todos)

  return

  // const auth = await google.auth.getClient({
  //   scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  // })
  // const sheets = google.sheets({ version: 'v4', auth })

  // const response = await sheets.spreadsheets.values.update(
  //   {
  //     spreadsheetId: process.env.SHEET_ID,
  //     range: 'Sheet1!A2:B2',
  //   },
  //   'hello'
  // )
}
