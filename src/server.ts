import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import handleErrors from './errors'
import router from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use(handleErrors)

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log(`Server is Running on port ${port}!`))