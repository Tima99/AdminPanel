const {PORT, DB_URL}  = require("./config")
const express         = require("express")
const mongoose        = require("mongoose")
const {postRoutes, protectedRoutes, getRoutes}    = require('./routes')
const cors            = require("cors")
const cookieParser    = require("cookie-parser")

const app = express()

const corsOptions = {
    origin: ["http://127.0.0.1:5173", "http://localhost:3000"],
    credentials : true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use('/api', postRoutes)
app.use('/api', getRoutes)
app.use('/api', protectedRoutes)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))

mongoose.set('strictQuery', false)
mongoose.connect(DB_URL)
.then(() => console.log("Database Connected"))
.catch((err) => console.log(err))
