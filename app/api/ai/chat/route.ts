import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { aiLearningService } from '@/lib/ai-learning-service';
import { OpenAI } from 'openai';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { message, context } = await req.json();

    const profile = await prisma.userAIProfile.findUnique({
      where: { userId: session.user.id }
    });

    const openai = new OpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a legal AI assistant for Indian law. 
User's profile:
- Practice Areas: ${JSON.stringify(profile?.practiceAreas || {})}
- Common queries: ${JSON.stringify(profile?.commonQueries || [])}
Provide helpful, accurate legal information based on Indian law.`
        },
        { role: "user", content: message }
      ]
    });

    const aiResponse = response.choices[0].message.content || '';

    // Track interaction
    await aiLearningService.trackInteraction({
      userId: session.user.id,
      type: 'CHAT',
      input: message,
      output: aiResponse,
      context
    });

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
