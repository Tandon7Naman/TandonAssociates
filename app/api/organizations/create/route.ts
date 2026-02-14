import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { organizationService } from '@/lib/organization-service';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const org = await organizationService.createOrganization({
      ...body,
      adminUserId: session.user.id
    });
    return NextResponse.json(org);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
