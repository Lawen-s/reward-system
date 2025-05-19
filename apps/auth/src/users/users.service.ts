import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users, UsersDocument } from "./schema/users.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { TokenService } from "../token/token.service";
import { UpdateUserDto } from "./dto/update.dto";
import { UserEventProgressService } from "src/user-event-progress/user-event-progress.service";

@Injectable()
export class UsersService {
  private readonly LOGIN_EVENT_ID = "682b76939bc027c1184d1f2f";
  private readonly FIRST = 1;
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<UsersDocument>,
    private readonly tokenService: TokenService,
    private readonly userEventProgressService: UserEventProgressService
  ) {}

  async create(
    createUserDto: CreateUserDto
  ): Promise<{ id: string; email: string; name: string }> {
    const { email, password, name } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      name,
    });
    return createdUser.save().then((user) => {
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      };
    });
  }

  async findOne(id: string): Promise<Users> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.userModel.findOne({ email }).exec();
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

    await this.userModel.findByIdAndUpdate(user.id, {
      lastLoginAt: new Date(),
    });

    await this.userEventProgressService.checkAndHandleLoginEvent(
      user.id,
      user.lastLoginAt
    );

    return { accessToken };
  }

  async update(updateUserDto: UpdateUserDto) {
    const { id, role } = updateUserDto;
    return await this.userModel.findByIdAndUpdate(id, { role }, { new: true });
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  private async validatePassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }
}
