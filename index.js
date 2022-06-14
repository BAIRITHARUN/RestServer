

const express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
var router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.use('/api', router);

let starttimeout;

let count = 0;

router.use((request, response, next) => {
    console.log('Middleware');
    request.start = Date.now()
    next();
})

app.get("/test", (req, res) => {
    console.log('test')
    let result = {
        time: Date.now(),
        count: count.toString()
    }
    res.send(result)
});

app.get('/removetimer', (req, res)=> {
    removeIntervals()
    res.send('cleared')
})

startincreament()

function startincreament () {
    starttimeout = setInterval(()=> {
        if(count == 0) {
            count = 10;
        } else {
            count = 0
        }
        console.log(count)
    }, 5000)
}

function removeIntervals () {
    clearInterval(starttimeout)
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
