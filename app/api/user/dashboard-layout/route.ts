import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const layout = await prisma.userDashboardLayout.findUnique({
      where: { userId: session.user.id }
    });

    if (!layout) {
      // @ts-ignore
      const defaultLayout = getDefaultLayout(session.user.role);
      return NextResponse.json(defaultLayout);
    }

    return NextResponse.json(layout);
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
    const { layout, widgets } = await req.json();

    const savedLayout = await prisma.userDashboardLayout.upsert({
      where: { userId: session.user.id },
      update: { layout, widgets },
      create: {
        userId: session.user.id,
        layout,
        widgets
      }
    });

    return NextResponse.json(savedLayout);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

function getDefaultLayout(role: string) {
  const defaults: any = {
    STUDENT: {
      layout: [
        { i: 'cases', x: 0, y: 0, w: 6, h: 3 },
        { i: 'hearings', x: 6, y: 0, w: 6, h: 3 },
        { i: 'documents', x: 0, y: 3, w: 12, h: 4 }
      ],
      widgets: ['cases', 'hearings', 'documents']
    },
    USER: {
      layout: [
        { i: 'analytics', x: 0, y: 0, w: 4, h: 2 },
        { i: 'cases', x: 4, y: 0, w: 4, h: 2 },
        { i: 'hearings', x: 8, y: 0, w: 4, h: 2 },
        { i: 'ai-insights', x: 0, y: 2, w: 6, h: 3 },
        { i: 'compliance', x: 6, y: 2, w: 6, h: 3 }
      ],
      widgets: ['analytics', 'cases', 'hearings', 'ai-insights', 'compliance']
    }
  };

  return defaults[role] || defaults.USER;
}
