const request = require('supertest')
const app = require('../app')
const {User,Category} = require('../models/index')
const Token = require('../helpers/jwt')

let token
let testCategory = {
    "name" : "testcategory",
}
beforeAll(async () => {
        let user = await User.bulkCreate([
            {
                "email" : "admin@mail.com",
                "password" : "admins",
                "role" : "Admin",
                "phoneNumber" : "admin",
                "address" : "admin"
            }
        ], {
            individualHooks: true
        })
        token = Token.genToken({id : user[0].id})
        let category = await Category.bulkCreate([testCategory])
})

describe("read GET /category", () => {
    test("success get category", async () => {
        const response = await request(app).get("/category").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body[0]).toHaveProperty("name",expect.any(String))
    })
    test("not login category", async () =>{
        const response = await request(app).get("/category")
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("invalid token category", async () => {
        const response = await request(app).get("/category")
        .set("Authorization", "adsi asdiasnduiw1n129dj1jdsa")
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
})

afterAll(async() =>{
    await User.destroy({truncate : true, cascade : true, restartIdentity : true })
})