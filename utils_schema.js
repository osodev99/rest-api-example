module.exports = {
    signInSchema: {
        type: "object",
        properties: {
            email: { type: "string" },
            password: { type: "string" },
        },
        required: ["email", "password"],
        additionalProperties: false,
    },

    signUpSchema: {
        type: "object",
        properties: {
            fullName: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
        },
        required: ["email", "password", "fullName"],
    }

}
