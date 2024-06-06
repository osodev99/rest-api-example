const router = require("express").Router();

const ajv = require("ajv");
const jwt = require("jsonwebtoken");
const Users = require("../model/user.model");
const { signInSchema, signUpSchema } = require("../../utils_schema");

const ajvUtil = new ajv({ allErrors: true });

router.get("/users", async (req, res) => {
    await Users.sync();
    const products = await Users.findAll();
    res.status(200).json({
        // ok: true,
        // status: 200,
        body: products,
    });
});

router.get("/users/:user_id", async (req, res) => {
    await Users.sync();
    const id = req.params.user_id;
    const user = await Users.findOne({ where: { id: id } });
    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(400).json({
            error: "User not found",
        });

    }
});

router.post("/signup", async (req, res) => {
    const signUpBody = req.body;
    const validate = ajvUtil.compile(signUpSchema);
    const valid = validate(signUpBody);
    if (!valid) {
        return res.status(400).json({
            error: "Invalid format", cause: validate.errors,
        });
    } else {
        await Users.sync();
        const createUser = await Users.create({
            fullName: signUpBody.fullName,
            email: signUpBody.email,
            password: signUpBody.password,
        });
        return res.status(201).json({
            message: "Created user",
        });
    }
});

router.post("/signin", async (req, res) => {
    const signInBody = req.body;
    const validate = ajvUtil.compile(signInSchema);
    const valid = validate(signInBody);
    if (!valid) {
        return res.status(400).json({
            error: "Invalid format", cause: validate.errors,
        });
    } else {
        await Users.sync();

        const user = await Users.findOne({
            where: { email: signInBody.email, password: signInBody.password }
        });

        if (user) {
            const token = jwt.sign(
                { userId: user.id },
                'SECRET-KEY'
            )
            return res.json({ token: token });
        } else {
            return res.status(400).json({
                error: "User not found",
            });
        }

    }
});

module.exports = router;