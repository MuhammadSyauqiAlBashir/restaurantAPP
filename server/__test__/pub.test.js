const request = require('supertest')
const app = require('../app')
const {User,Category, Cuisine} = require('../models/index')
const Token = require('../helpers/jwt')
const fs = require('fs')
const cuisine = require('../models/cuisine')

let testCuisine = JSON.parse(fs.readFileSync('./testcuisine.json', 'utf-8'))
beforeAll(async () => {
    try {
        
        let user = await User.bulkCreate([
            {
                "email" : "admin@mail.com",
                "password" : "admins",
                "role" : "Admin",
                "phoneNumber" : "admin",
                "address" : "admin"
                },
                {
                    "email" : "admin2@mail.com",
                    "password" : "admins2",
                    "role" : "Admin2",
                    "phoneNumber" : "admin2",
                    "address" : "admin2"
                },            {
                    "email" : "admin3@mail.com",
                    "password" : "admins3",
                    "role" : "Admin3",
                    "phoneNumber" : "admin3",
                    "address" : "admin3"
                },
            ], {
                individualHooks: true
            })
            let category = await Category.bulkCreate([
                {
                    "name" : "tes1"
                },{
                    "name" : "tes2"
                },{
                    "name" : "tes3"
                },
            ])
            let cuisine = await Cuisine.bulkCreate(testCuisine)
    } catch (error) {
        console.log(error);
    }
})

describe("testpub GET /pub/cuisine", () => {
    test("success get pub cuisine no query addtional", async () =>{
        const response = await request(app).get("/pub/cuisine")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("page", expect.any(Number))
        expect(response.body.data.length).toBeGreaterThan(0)
        expect(response.body.data[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("name",expect.any(String) )
        expect(response.body.data[0]).toHaveProperty("description",expect.any(String) )
        expect(response.body.data[0]).toHaveProperty("price",expect.any(Number) )
        expect(response.body.data[0]).toHaveProperty("imgUrl",expect.any(String) )
        expect(response.body.data[0]).toHaveProperty("categoryId",expect.any(Number) )
        expect(response.body.data[0]).toHaveProperty("authorId",expect.any(Number) )
        expect(response.body).toHaveProperty("totalData", expect.any(Number)) 
        expect(response.body).toHaveProperty("totalPage", expect.any(Number)) 
        expect(response.body).toHaveProperty("dataPerPage", expect.any(Number)) 
    })
    test("success get pub cuisine filter query addtional", async () =>{
        const response = await request(app).get("/pub/cuisine?filter=1")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("page", expect.any(Number))
        expect(response.body.data.length).toBeGreaterThan(0)
        expect(response.body.data[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("name",expect.any(String) )
        expect(response.body.data[0]).toHaveProperty("description",expect.any(String) )
        expect(response.body.data[0]).toHaveProperty("price",expect.any(Number) )
        expect(response.body.data[0]).toHaveProperty("imgUrl",expect.any(String) )
        expect(response.body.data[0]).toHaveProperty("categoryId", 1 )
        expect(response.body.data[0]).toHaveProperty("authorId",expect.any(Number) )
        expect(response.body).toHaveProperty("totalData", expect.any(Number)) 
        expect(response.body).toHaveProperty("totalPage", expect.any(Number)) 
        expect(response.body).toHaveProperty("dataPerPage", expect.any(Number)) 
    })
    test("success get pub cuisine page 2 query addtional", async () =>{
        const response = await request(app).get("/pub/cuisine?page[number]=2")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("page", expect.any(Number))
        expect(response.body.data.length).toBeGreaterThan(0)
        expect(response.body).toHaveProperty("page", 2) 
        expect(response.body.data[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("name",expect.any(String) )
        expect(response.body.data[0]).toHaveProperty("description",expect.any(String) )
        expect(response.body.data[0]).toHaveProperty("price",expect.any(Number) )
        expect(response.body.data[0]).toHaveProperty("imgUrl",expect.any(String) )
        expect(response.body.data[0]).toHaveProperty("categoryId", expect.any(Number) )
        expect(response.body.data[0]).toHaveProperty("authorId",expect.any(Number) )
        expect(response.body).toHaveProperty("totalData", 25) 
        expect(response.body).toHaveProperty("totalPage", 3) 
        expect(response.body).toHaveProperty("dataPerPage", 10) 
    })
})

describe("detail cuisine pub GET /pub/cuisine/:id", () =>{
    test("success get detail cuisine pub", async () => {
        const response = await request(app).get("/pub/cuisine/1")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("description", expect.any(String))
        expect(response.body).toHaveProperty("price", expect.any(Number))
        expect(response.body).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body).toHaveProperty("authorId", expect.any(Number))
    })
    test("invalid params get one cuisine pub" , async ()=>{
        const response = await request(app).get("/pub/cuisine/900")
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "errorNotFound")
    })
})

afterAll(async() =>{
    await User.destroy({truncate : true, cascade : true, restartIdentity : true })
})