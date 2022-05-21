import { Body, Controller, Post } from '@nestjs/common';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/register')
  async syncProposals(@Body() body: Member): Promise<any> {
    const response = await this.memberService.create(body);
    return response;
  }
}
