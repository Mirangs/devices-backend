import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import projectsController from './controllers/projects'

dotenv.config()

const app = express()

app.use(cors())

app.use('/projects', projectsController)

const { PORT = 3001 } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
