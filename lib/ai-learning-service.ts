import { prisma } from './prisma';
import { OpenAI } from 'openai';

export class AILearningService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  // Track user interaction
  async trackInteraction(data: {
    userId: string;
    type: string;
    input: string;
    output: string;
    context?: any;
  }) {
    // Save interaction
    const interaction = await prisma.aIInteraction.create({
      data: {
        userId: data.userId,
        type: data.type,
        input: data.input,
        output: data.output,
        context: data.context || {}
      }
    });

    // Analyze and update user profile (async)
    this.analyzeAndLearn(data.userId).catch(err => console.error('AI learning error:', err));

    return interaction;
  }

  // Analyze user patterns
  async analyzeAndLearn(userId: string) {
    // Get recent interactions
    const recentInteractions = await prisma.aIInteraction.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: 100
    });

    // Detect patterns
    const patterns = await this.detectPatterns(recentInteractions);

    // Update AI profile
    await this.updateAIProfile(userId, patterns);

    return patterns;
  }

  private async detectPatterns(interactions: any[]) {
    // 1. Practice Area Detection
    const practiceAreas = this.detectPracticeAreas(interactions);

    // 2. Common Queries
    const commonQueries = this.detectCommonQueries(interactions);

    // 3. Work Patterns
    const workPatterns = this.detectWorkPatterns(interactions);

    // 4. Document Preferences
    const documentTypes = this.detectDocumentTypes(interactions);

    return {
      practiceAreas,
      commonQueries,
      workPatterns,
      documentTypes,
      totalInteractions: interactions.length
    };
  }

  private detectPracticeAreas(interactions: any[]) {
    const keywords: any = {
      'CRIMINAL_LAW': ['ipc', 'crpc', 'fir', 'bail', 'criminal', 'murder', 'theft'],
      'CIVIL_LAW': ['contract', 'property', 'civil', 'damages', 'suit'],
      'CORPORATE_LAW': ['company', 'mca', 'board', 'shareholders', 'articles'],
      'FAMILY_LAW': ['divorce', 'custody', 'marriage', 'alimony', 'adoption'],
      'TAX_LAW': ['income tax', 'gst', 'tds', 'assessment', 'itr'],
      'LABOUR_LAW': ['employee', 'employer', 'termination', 'pf', 'esi'],
      'IPR': ['patent', 'trademark', 'copyright', 'intellectual property'],
      'REAL_ESTATE': ['property', 'sale deed', 'lease', 'rera', 'possession']
    };

    const areas: any = {};

    interactions.forEach(interaction => {
      const text = (interaction.input + ' ' + interaction.output).toLowerCase();

      Object.entries(keywords).forEach(([area, words]: [string, any]) => {
        const matches = words.filter((word: string) => text.includes(word)).length;
        if (matches > 0) {
          areas[area] = (areas[area] || 0) + matches;
        }
      });
    });

    const total = Object.values(areas).reduce((a: any, b: any) => a + b, 0) as number;
    if (total === 0) return {};

    Object.keys(areas).forEach(key => {
      areas[key] = Math.round((areas[key] / total) * 100);
    });

    return areas;
  }

  private detectCommonQueries(interactions: any[]) {
    const queries: any = {};

    interactions.forEach(interaction => {
      const normalized = interaction.input.toLowerCase().trim();
      queries[normalized] = (queries[normalized] || 0) + 1;
    });

    return Object.entries(queries)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));
  }

  private detectWorkPatterns(interactions: any[]) {
    const hourCounts: any = {};
    const dayOfWeekCounts: any = {};

    interactions.forEach(interaction => {
      const date = new Date(interaction.timestamp);
      const hour = date.getHours();
      const dayOfWeek = date.getDay();

      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      dayOfWeekCounts[dayOfWeek] = (dayOfWeekCounts[dayOfWeek] || 0) + 1;
    });

    const peakHours = Object.entries(hourCounts)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 3)
      .map(([hour]) => parseInt(hour));

    return {
      peakHours,
      totalInteractions: interactions.length
    };
  }

  private detectDocumentTypes(interactions: any[]) {
    const documentKeywords: any = {
      'VAKALATNAMA': ['vakalatnama', 'authorization', 'power of attorney'],
      'AFFIDAVIT': ['affidavit', 'sworn statement'],
      'PETITION': ['petition', 'writ', 'appeal'],
      'NOTICE': ['notice', 'legal notice'],
      'CONTRACT': ['agreement', 'contract', 'mou'],
      'REPLY': ['reply', 'counter', 'response']
    };

    const types: any = {};

    interactions.forEach(interaction => {
      if (interaction.type === 'DOCUMENT_GENERATION') {
        const text = interaction.input.toLowerCase();

        Object.entries(documentKeywords).forEach(([type, keywords]: [string, any]) => {
          if (keywords.some((keyword: string) => text.includes(keyword))) {
            types[type] = (types[type] || 0) + 1;
          }
        });
      }
    });

    return types;
  }

  private async updateAIProfile(userId: string, patterns: any) {
    await prisma.userAIProfile.upsert({
      where: { userId },
      update: {
        practiceAreas: patterns.practiceAreas,
        commonQueries: patterns.commonQueries,
        workPatterns: patterns.workPatterns,
        documentTypes: patterns.documentTypes,
        lastTrainedAt: new Date(),
        trainingDataSize: patterns.totalInteractions || 0
      },
      create: {
        userId,
        practiceAreas: patterns.practiceAreas,
        commonQueries: patterns.commonQueries,
        workPatterns: patterns.workPatterns,
        documentTypes: patterns.documentTypes,
        lastTrainedAt: new Date(),
        trainingDataSize: patterns.totalInteractions || 0
      }
    });
  }

  async getPersonalizedSuggestions(userId: string) {
    const profile = await prisma.userAIProfile.findUnique({
      where: { userId }
    });

    if (!profile) {
      return [
        { type: 'ONBOARDING', suggestion: 'Complete your profile to get personalized suggestions' },
        { type: 'EXPLORE', suggestion: 'Explore Indian legal research with 10M+ judgments' }
      ];
    }

    const suggestions: any[] = [];
    const practiceAreas: any = profile.practiceAreas;
    
    const topPracticeArea = Object.entries(practiceAreas)
      .sort(([, a]: any, [, b]: any) => b - a)[0];

    if (topPracticeArea) {
      suggestions.push({
        type: 'PRACTICE_AREA',
        suggestion: `Quick access to ${topPracticeArea[0]} resources`,
        confidence: (topPracticeArea[1] as number) / 100
      });
    }

    return suggestions;
  }
}

export const aiLearningService = new AILearningService();
