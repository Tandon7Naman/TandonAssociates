import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { studentVerificationService } from '@/lib/student-verification-service';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const status = await studentVerificationService.checkStudentStatus(session.user.id);
    return NextResponse.json(status);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const verification = await studentVerificationService.verifyStudent({
      userId: session.user.id,
      ...body,
      expectedGraduation: new Date(body.expectedGraduation)
    });
    return NextResponse.json(verification);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
