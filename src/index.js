const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
//const ejs = require('ejs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/archivos'),
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
})

//configuraciones
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')



//middlewares
app.use(morgan('dev'))
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/archivos')
}).any())


//rutas
//app.use(require('./routes/index'))
app.get('/solicitud', (req,res) => {
    res.render('index')
});

app.post('/solicitud', (req,res) => {
    console.log(req.body)
    res.send("recibido")
});

//Iniciamos el servidor
app.listen(3000, () => {
    console.log(`Servidor en el puerto ${app.get('port')}`)
})
