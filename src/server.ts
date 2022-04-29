import express from 'express'
import handleErrors from './errors'
import router from './routes'

const app = express()

app.use(express.json())
app.use(handleErrors)
app.use(router)

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Server is Running on port ${port}!`))