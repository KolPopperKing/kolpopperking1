import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const { gameType, topic, age } = await request.json();
    const type = gameType.toLowerCase();

    // הפונקציה המדויקת שלך לכל 25 הסוגים
    const getSchema = () => {
      if (type.includes('wheel') || type.includes('spin')) {
        return z.object({
          text: z.string().describe("המילה שעל הגלגל"),
          instruction: z.string().describe("השאלה או המשימה שקופצת")
        });
      }
      if (type.includes('fill') || type.includes('blank') || type.includes('missing') || type.includes('word') || type.includes('scramble')) {
        return z.object({
          sentence: z.string().describe("המשפט עם ____ או המילה המבולבלת"),
          answer: z.string().describe("הפתרון הנכון")
        });
      }
      if (type.includes('trivia') || type.includes('quiz') || type.includes('choice')) {
        return z.object({
          question: z.string().describe("השאלה"),
          ans1: z.string().describe("התשובה הנכונה"),
          ans2: z.string().describe("תשובה שגויה 1"),
          ans3: z.string().describe("תשובה שגויה 2"),
          ans4: z.string().describe("תשובה שגויה 3")
        });
      }
      if (type.includes('match') || type.includes('pair') || type.includes('sort') || type.includes('connect') || type.includes('memory')) {
        return z.object({
          sideA: z.string().describe("פריט א'"),
          sideB: z.string().describe("פריט ב' המקביל לו")
        });
      }
      if (type.includes('true') || type.includes('false')) {
        return z.object({
          statement: z.string().describe("ההיגד"),
          answer: z.boolean().describe("האם נכון או לא")
        });
      }
      return z.object({
        question: z.string().describe("השאלה/פריט"),
        answer: z.string().describe("התשובה/פתרון"),
        hint: z.string().optional().describe("רמז")
      });
    };

    const { object } = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: z.array(getSchema()),
      prompt: `צור תוכן למשחק ${gameType} בנושא ${topic} לילדים בגיל ${age}.
      צור בדיוק 10 פריטים. 
      חשוב: תוכן חינוכי, שפה פשוטה, מותאם לערכי הציבור החרדי/דתי.`,
    });

    return NextResponse.json(object);

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}