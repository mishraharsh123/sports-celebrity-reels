import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a script about a sports celebrity
 */
export async function generateAthleteBiographyScript(name: string, sport: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert sports historian. Create engaging, factual, and concise scripts for short video reels about famous athletes. Include key career achievements, records, and interesting facts. Keep the script between 100-150 words, optimized for a 30-45 second narration.',
        },
        {
          role: 'user',
          content: `Create a script for a short video about ${name}, the ${sport} athlete. The script should highlight their career, achievements, and legacy in an engaging narrative style.`,
        },
      ],
      max_tokens: 500,
    });

    return {
      success: true, 
      script: completion.choices[0]?.message.content || '',
    };
  } catch (error) {
    console.error('Error generating script:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Generate image prompts for the athlete
 */
export async function generateImagePrompts(name: string, sport: string, scriptContent: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at creating detailed image prompts for AI image generation tools. Create 4 specific prompts that would result in high-quality, realistic images related to the athlete being described. Focus on iconic moments, actions, or poses that define their career.',
        },
        {
          role: 'user',
          content: `Based on this script about ${name}, the ${sport} athlete, create 4 detailed image prompts that capture key moments or aspects of their career:\n\n${scriptContent}`,
        },
      ],
      max_tokens: 500,
    });

    const promptsText = completion.choices[0]?.message.content || '';
    // Extract the numbered prompts from the text
    const prompts = promptsText
      .split(/\d+\./)
      .filter(Boolean)
      .map(prompt => prompt.trim());

    return { success: true, prompts: prompts.slice(0, 4) };
  } catch (error) {
    console.error('Error generating image prompts:', error);
    return { 
      success: false, 
      prompts: [], 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
