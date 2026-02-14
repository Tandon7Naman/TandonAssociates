import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { aiLearningService } from '@/lib/ai-learning-service';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const suggestions = await aiLearningService.getPersonalizedSuggestions(session.user.id);
    return NextResponse.json(suggestions);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
