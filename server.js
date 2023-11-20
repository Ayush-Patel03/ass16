const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images" });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let cars = [
    {
        _id: 1,
        name: "Accord",
        description: "Extra soft and bannanny",
    
    },
    {
        _id: 2,
        name: "Camry",
        description: "Very chocolately cookies",
    
    },
    {
        _id: 3,
        name: "pilot",
        description: "Real vanilla bean in a cake",
    
    },
];

app.get("/api/cars", (req,res) => {
    res.send(cars);
});

app.post("/api/cars", upload.single("img"), (req, res) => {
    console.log(req.body);
    const result = validateCar(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const car = {
        _id: cars.length + 1,
        name: req.body.name,
        description: req.body.description,
    }

    cars.push(car);
    res.send(cars);
});

const validateCar = (car) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        ingredients: Joi.allow(""),
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required()
    });

    return schema.validate(car);
};

app.listen(3000, () => {
    console.log("I'm listening");
});