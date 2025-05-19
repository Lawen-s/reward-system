import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users, UsersDocument } from "./schema/users.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { TokenService } from "../token/token.service";
import { UpdateUserDto } from "./dto/update.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<UsersDocument>,
    private readonly tokenService: TokenService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { email, password, name } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      name,
    });
    return createdUser.save();
  }

  async findOne(id: string): Promise<Users> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<Users> {
    return this.userModel.findOne({ email }).exec();
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const isPasswordValid = await this.validatePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const accessToken = await this.tokenService.createAccessToken(
      user.id,
      user.role
    );
    return { accessToken };
  }

  async update(updateUserDto: UpdateUserDto) {
    const { id, role } = updateUserDto;
    return this.userModel.findByIdAndUpdate(id, { role }, { new: true });
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  private async validatePassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }
}
