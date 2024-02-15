import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { NewPersonDTO } from './dto/user.dto'
import { UserService } from './user.service'

type NameObject = {
    name: string
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

    @Get('/user')
    getUser(@Res() res) {
        res.json({ test: test })
    }

    @Post('/create')
    async createAndSavePerson(@Res() res, @Body() newPerson: NewPersonDTO) {
        const user = await this.userService.newUser(newPerson)
        return res.status(200).json(user);
    }

}
