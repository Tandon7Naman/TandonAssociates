import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { organizationService } from '@/lib/organization-service';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const orgs = await organizationService.getUserOrganizations(session.user.id);
    return NextResponse.json(orgs);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
