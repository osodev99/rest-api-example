const router = require("express").Router();
const ajv = require("ajv");
const jwt = require("jsonwebtoken");

const Phrase = require("../model/phrase.model");
const Users = require("../model/user.model");
const { phraseSchema } = require("../../utils_schema");
const { where } = require("sequelize");
const ajvUtil = new ajv({ allErrors: true });

router.get("/phrases", async (req, res) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, 'SECRET-KEY');
            const phrases = await Phrase.findAll();
            return res.status(200).json({ body: phrases });
        } catch (error) {
            return res.status(401).send({
                "error": "Token invalido", cause: error
            })
        }

    } else {
        return res.status(403).send({ error: "Se requiere token" })
    }
});

router.get("/phrases/:phrase_id", async (req, res) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, 'SECRET-KEY');
            const id = req.params.phrase_id;
            const phrase = await Phrase.findOne({
                where: { id: id },
                include: Users,
            });
            return res.status(200).json(phrase);
        } catch (error) {
            return res.status(401).send({
                "error": "Token invalido", cause: error
            })
        }

    } else {
        return res.status(403).send({ error: "Se requiere token" })
    }
});

router.delete("/phrases/:phrase_id", async (req, res) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, 'SECRET-KEY');
            const userId = payload.userId;
            const phraseId = req.params.phrase_id;
            const phrase = await Phrase.findOne({
                where: { id: phraseId, UserId: userId },
                include: Users,
            });
            if (phrase) {
                await phrase.destroy();
                return res.status(200).json({ message: "Deleted phrase" });
            } else {
                return res.status(404).json({ error: "Phrase not found" });
            }
        } catch (error) {
            return res.status(401).send({
                "error": "Token invalido", cause: error
            })
        }

    } else {
        return res.status(403).send({ error: "Se requiere token" })
    }
});

router.post("/phrases", async (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const validate = ajvUtil.compile(phraseSchema);
        const valid = validate(req.body);
        try {
            if (!valid) {
                return res.status(400).json({
                    error: "Invalid format", cause: validate.errors
                });
            } else {
                console.log(token);
                const payload = jwt.verify(token, 'SECRET-KEY');
                console.log(payload);
                const userId = payload.userId;
                const user = await Users.findOne({ where: { id: userId } });
                const { phrase, latitude, longitude } = req.body;
                const newPhrase = await Phrase.create({
                    phrase,
                    latitude,
                    longitude,
                });
                user.addPhrase(newPhrase);
                return res.status(201).json({ message: "Created phrase" });
            }
        } catch (error) {
            return res.status(401).send({
                "error": "Token invalido", cause: error
            })
        }

    } else {
        return res.status(403).send({ error: "Se requiere token" })
    }

});

module.exports = router;