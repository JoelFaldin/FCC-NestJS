import { Body, Controller, Delete, Get, Patch, Post, Query, Res } from '@nestjs/common';
import { NewPersonDTO } from './dto/user.dto'
import { UserService } from './user.service'

type NameObject = {
    name?: string
    food?: string
}

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // GET http://localhost:3000/user/user
    // { "name": "Joel" } (in Postman)
    @Get('/user')
    async getUserByName(@Res() res, @Body() nameObject: NameObject) {
        const user = await this.userService.getByName(nameObject.name);
        res.json(user);
    }

    // POST http://localhost:3000/user/createManyPeople
    // [
    //     {
    //         "name": "Josh",
    //         "age": 22,
    //         "favoriteFoods": ["fries", "tomatoes", "orange juice"]
    //     },
    //     {
    //         "name": "Andrew",
    //         "age": 23,
    //         "favoriteFoods": ["iced coffee", "ramen"]
    //     }
    // ]
    @Post('/createManyPeople')
    async getUser(@Res() res, @Body() arrayOfPeople: NameObject[]) {
        const users = await this.userService.createManyPeople(arrayOfPeople);
        res.json(users);
    }

    // POST http://localhost:3000/user/create
    // {
    //     "name": "Josh",
    //     "age": 22,
    //     "favoriteFoods": ["fries", "tomatoes", "orange juice"]
    // }
    @Post('/create')
    async createAndSavePerson(@Res() res, @Body() newPerson: NewPersonDTO) {
        const user = await this.userService.newUser(newPerson)
        return res.status(200).json(user);
    }

    // GET http://localhost:3000/user/findByFood?food=fries
    @Get('/findByFood')
    async findOneByFood(@Res() res, @Query('food') food: string ) {
        const user = await this.userService.findByFood(food);
        res.json(user);
    }

    // GET http://localhost:3000/user/findById?id=65ce56a5fbb2514846c39b49
    @Get('/findById')
    async findPersonById(@Res() res, @Query('id') id: string) {
        const user = await this.userService.getPersonById(id);
        res.json(user);
    }

    // PATCH http://localhost:3000/user/addOneFood?id=65ce56a5fbb2514846c39b49
    @Patch('/addOneFood')
    async findEditThenSave(@Res() res, @Query('id') id: string) {
        const patchedUser = await this.userService.findEditThenSave(id);
        res.json(patchedUser);
    }

    // PATCH http://localhost:3000/user/updateAge?id=65ce56f4fbb2514846c39b4f&age=24
    @Patch('/updateAge')
    async updateAge(@Res() res, @Query('id') id: string, @Query('age') age: number) {
        const updatedAge = await this.userService.updateAge(id, age);
        res.json(updatedAge);
    }

    // DELETE http://localhost:3000/user/delete?id=65ce5715fbb2514846c39b52
    @Delete('/delete')
    async removeById(@Res() res, @Query('id') id: string) {
        const deleteUser = await this.userService.deleteUser(id);
        res.json({ message: 'User deleted succesfully', deleteUser })
    }

    // DELETE http://localhost:3000/user/deleteMany
    @Delete('/deleteMany')
    async removeMany(@Res() res) {
        const deletedUsers = await this.userService.deleteMany();
        res.json({ message: 'Users deleted!', deletedUsers });
    }

    // GET http://localhost:3000/user/getQuery
    @Get('/getQuery')
    async queryChain(@Res() res) {
        const user = await this.userService.queryChain();
        res.json(user);
    }
}
