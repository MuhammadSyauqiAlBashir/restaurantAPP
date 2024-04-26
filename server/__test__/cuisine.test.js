const request = require('supertest')
const app = require('../app')
const {User, Cuisine, Category} = require('../models/index')
const Token = require('../helpers/jwt')
const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, "../test.jpg");
const imageBuffer = fs.readFileSync(filePath);

let token
let token2
let testCuisine = {
    "name" : "testcuisine",
    "description" : "testcuisinedesc",
    "price" : 150000,
    "imgUrl" : "testcuisineimg",
    "categoryId" : 1,
    "authorId" : 2
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
        let userstaff = await User.bulkCreate([
            {
                "email" : "staff@mail.com",
                "password" : "staffs",
                "phoneNumber" : "staff",
                "address" : "staff"
            }
        ], {
            individualHooks: true
        })
        token = Token.genToken({id : user[0].id})
        token2 = Token.genToken({id : userstaff[0].id})
        let category = await Category.bulkCreate([
            {
                "name" : "testcategory"
            }
        ])
        let cuisine = await Cuisine.bulkCreate([testCuisine])
})

describe("Create POST /cuisine", () => {
    test("success create cuisine", async () =>{
        const dummyData = {
            "name" : "testcuisinedummy",
            "description" : "testcuisinedescdummy",
            "price" : 100000,
            "imgUrl" : "testcuisineimgdummy",
            "categoryId" : 1,
            "authorId" : 1
        }
        const response = await request(app).post("/cuisine").set("Authorization", `Bearer ${token}`)
        .send(dummyData)
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("name", dummyData.name)
        expect(response.body).toHaveProperty("description", dummyData.description)
        expect(response.body).toHaveProperty("price", dummyData.price)
        expect(response.body).toHaveProperty("imgUrl", dummyData.imgUrl)
        expect(response.body).toHaveProperty("categoryId", dummyData.categoryId)
        expect(response.body).toHaveProperty("authorId", dummyData.authorId)  
    })
    test("not login create cuisine", async () =>{
        const dummyData = {
            "name" : "testcuisinedummy",
            "description" : "testcuisinedescdummy",
            "price" : 100000,
            "imgUrl" : "testcuisineimgdummy",
            "categoryId" : 1,
            "authorId" : 1
        }
        const response = await request(app).post("/cuisine")
        .send(dummyData)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")

    })
    test("no token create cuisine", async () =>{
        const dummyData = {
            "name" : "testcuisinedummy",
            "description" : "testcuisinedescdummy",
            "price" : 100000,
            "imgUrl" : "testcuisineimgdummy",
            "categoryId" : 1,
            "authorId" : 1
        }
        const response = await request(app).post("/cuisine")
        .set("Authorization", "adsi asdiasnduiw1n129dj1jdsa")
        .send(dummyData)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("wrong input minimum price create cuisine", async () =>{
        const dummyData = {
            "name" : "testcuisinedummy",
            "description" : "testcuisinedescdummy",
            "price" : 10,
            "imgUrl" : "testcuisineimgdummy",
            "categoryId" : 1,
            "authorId" : 1
        }
        const response = await request(app).post("/cuisine").set("Authorization", `Bearer ${token}`)
        .send(dummyData)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body).toEqual(expect.arrayContaining(["Minimum Price is Rp. 10,000.00"]))
    })
    test("wrong input data create cuisine", async () =>{
        const dummyData = {
            "name" : "",
            "description" : "",
            "price" : "",
            "imgUrl" : "",
            "categoryId" : "",
            "authorId" : ""
        }
        const response = await request(app).post("/cuisine").set("Authorization", `Bearer ${token}`)
        .send(dummyData)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body).toEqual(expect.arrayContaining(["Name is required", "Description is required", "Price is required", "Image Url is required", "Category ID is required"]))
    })
})
describe("read GET /cuisine", () => {
    test("success get cuisine", async () =>{
        const response = await request(app).get("/cuisine").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body[0]).toHaveProperty("name",expect.any(String) )
        expect(response.body[0]).toHaveProperty("description",expect.any(String) )
        expect(response.body[0]).toHaveProperty("price",expect.any(Number) )
        expect(response.body[0]).toHaveProperty("imgUrl",expect.any(String) )
        expect(response.body[0]).toHaveProperty("categoryId",expect.any(Number) )
        expect(response.body[0]).toHaveProperty("authorId",expect.any(Number) )
    })
    test("not login cuisine", async () =>{
        const response = await request(app).get("/cuisine")
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("invalid token cuisine", async () => {
        const response = await request(app).get("/cuisine")
        .set("Authorization", "adsi asdiasnduiw1n129dj1jdsa")
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
})

describe("read detail cuisin GET /cuisine/:id", () =>{
    test("success get one cuisine", async () => {
        const response = await request(app).get("/cuisine/1").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", 1)
        expect(response.body).toHaveProperty("name", testCuisine.name)
        expect(response.body).toHaveProperty("description", testCuisine.description)
        expect(response.body).toHaveProperty("price", testCuisine.price)
        expect(response.body).toHaveProperty("imgUrl", testCuisine.imgUrl)
        expect(response.body).toHaveProperty("categoryId", testCuisine.categoryId)
        expect(response.body).toHaveProperty("authorId", testCuisine.authorId)
    })
    test("non login get one cuisine" , async ()=>{
        const response = await request(app).get("/cuisine/1") 
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("invalid token login get one cuisine" , async ()=>{
        const response = await request(app).get("/cuisine/1").set("Authorization", "asdiasnduiw1n129dj1jdsa")
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("invalid params get one cuisine" , async ()=>{
        const response = await request(app).get("/cuisine/900").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "errorNotFound")
    })
})

describe("edit put cuisine PUT /cuisine/:id", () => {
    test("success edit cuisine put", async () => {
            const dummyData = {
                "name" : "testputdummy",
                "description" : "testputdummy",
                "price" : 50000,
                "imgUrl" : "testputdummy",
                "categoryId" : 1,
                "authorId" : 1
            }
        const response = await request(app).put("/cuisine/1").set("Authorization", `Bearer ${token}`).send(dummyData)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("name", dummyData.name)
        expect(response.body).toHaveProperty("description", dummyData.description)
        expect(response.body).toHaveProperty("price", dummyData.price)
        expect(response.body).toHaveProperty("imgUrl", dummyData.imgUrl)
        expect(response.body).toHaveProperty("categoryId", dummyData.categoryId)
        expect(response.body).toHaveProperty("authorId", dummyData.authorId) 
    })
    test("non login edit cuisine put", async () => {
        const dummyData = {
            "name" : "testputdummy",
            "description" : "testputdummy",
            "price" : 50000,
            "imgUrl" : "testputdummy",
            "categoryId" : 1,
            "authorId" : 1
        }
        const response = await request(app).put("/cuisine/1").send(dummyData)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("wrong token edit cuisine put", async () => {
        const dummyData = {
            "name" : "testputdummy",
            "description" : "testputdummy",
            "price" : 50000,
            "imgUrl" : "testputdummy",
            "categoryId" : 1,
            "authorId" : 1
        }
        const response = await request(app).put("/cuisine/1").set("Authorization", "adsi asdiasnduiw1n129dj1jdsa").send(dummyData)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("wrong params edit cuisine put", async () => {
        const dummyData = {
            "name" : "testputdummy",
            "description" : "testputdummy",
            "price" : 50000,
            "imgUrl" : "testputdummy",
            "categoryId" : 1,
            "authorId" : 1
        }
        const response = await request(app).put("/cuisine/9000").set("Authorization", `Bearer ${token}`).send(dummyData)
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "errorNotFound")
    })
    test("wrong author edit cuisine put", async () => {
        const dummyData = {
            "name" : "testputdummy",
            "description" : "testputdummy",
            "price" : 50000,
            "imgUrl" : "testputdummy",
            "categoryId" : 1,
            "authorId" : 1
        }
        const response = await request(app).put("/cuisine/1").set("Authorization", `Bearer ${token2}`).send(dummyData)
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Forbidden")
    })
    test("wrong input edit put cuisine", async () => {
        const dummyData = {
            "name" : "",
            "description" : "",
            "price" : "",
            "imgUrl" : "",
            "categoryId" : "",
            "authorId" : ""
        }
        const response = await request(app).put("/cuisine/1").set("Authorization", `Bearer ${token}`).send(dummyData)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body).toEqual(expect.arrayContaining(["Name is required", "Description is required", "Price is required", "Image Url is required", "Category ID is required"]))
    })
})

describe("change img url PATCH /cuisine/:id", () => {
    test("success change imgUrl cuisine", async () => {
        const response = await request(app).patch("/cuisine/1").set("Authorization", `Bearer ${token}`)
        .attach("photo", imageBuffer, "test.jpg")
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", expect.stringContaining('success to update'))
    })
    test("non login change imgUrl cuisine" , async ()=>{
        const response = await request(app).patch("/cuisine/1")
        .attach("photo", imageBuffer, "test.jpg")
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("invalid token login change imgUrl cuisine" , async ()=>{
        const response = await request(app).patch("/cuisine/1").set("Authorization", "asdiasnduiw1n129dj1jdsa")
        .attach("photo", imageBuffer, "test.jpg")
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("invalid params change imgUrl cuisine" , async ()=>{
        const response = await request(app).patch("/cuisine/900").set("Authorization", `Bearer ${token}`)
        .attach("photo", imageBuffer, "test.jpg")
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "errorNotFound")
    })
    test("wrong author change imgUrl cuisine", async () => {
        const response = await request(app).patch("/cuisine/1").set("Authorization", `Bearer ${token2}`)
        .attach("photo", imageBuffer, "test.jpg")
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Forbidden")
    })
    test("invalid body change imgUrl cuisine", async() => {
        const response = await request(app).patch("/cuisine/1").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Please input File")
    })
})

describe("delete cuisine DELETE /cuisine/:id", () => {
    test("non login delete cuisine" , async ()=>{
        const response = await request(app).delete("/cuisine/1") 
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("invalid token login delete cuisine" , async ()=>{
        const response = await request(app).delete("/cuisine/1").set("Authorization", "asdiasnduiw1n129dj1jdsa")
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("invalid params delete one cuisine" , async ()=>{
        const response = await request(app).delete("/cuisine/900").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "errorNotFound")
    })
    test("wrong author delete cuisine put", async () => {
        const response = await request(app).delete("/cuisine/1").set("Authorization", `Bearer ${token2}`)
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Forbidden")
    })
    test("succcess delete cuisine", async () => {
        const response = await request(app).delete("/cuisine/1").set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", expect.stringContaining('success to delete'))
    })
})

afterAll(async() =>{
    await User.destroy({truncate : true, cascade : true, restartIdentity : true })
    await Category.destroy({truncate : true, cascade : true, restartIdentity : true })
    await Cuisine.destroy({truncate : true, cascade : true, restartIdentity : true })
})