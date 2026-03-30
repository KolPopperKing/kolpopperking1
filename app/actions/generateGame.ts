"use server";

import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function generateGameAction(gameType: string, topic: string, age: string) {
  const type = gameType.toLowerCase();

  // הגדרת הסכמה לכל 25 הסוגים (חלוקה למשפחות)
  const getSchema = () => {
    // 1. גלגל המזל / הגרלות
    if (type.includes('wheel') || type.includes('spin')) {
      return z.object({
        text: z.string().describe("המילה שעל הגלגל"),
        instruction: z.string().describe("השאלה או המשימה שקופצת")
      });
    }
    // 2. השלמת משפטים / אותיות / תפזורת / מילים מבולבלות
    if (type.includes('fill') || type.includes('blank') || type.includes('missing') || type.includes('word') || type.includes('scramble')) {
      return z.object({
        sentence: z.string().describe("המשפט עם ____ או המילה המבולבלת"),
        answer: z.string().describe("הפתרון הנכון")
      });
    }
    // 3. טריוויה / בחירה מרובה / שאלון
    if (type.includes('trivia') || type.includes('quiz') || type.includes('choice')) {
      return z.object({
        question: z.string().describe("השאלה"),
        ans1: z.string().describe("התשובה הנכונה"),
        ans2: z.string().describe("תשובה שגויה 1"),
        ans3: z.string().describe("תשובה שגויה 2"),
        ans4: z.string().describe("תשובה שגויה 3")
      });
    }
    // 4. התאמה / זוגות / מיון / זכרון / חיבור מושגים
    if (type.includes('match') || type.includes('pair') || type.includes('sort') || type.includes('connect') || type.includes('memory')) {
      return z.object({
        sideA: z.string().describe("פריט א'"),
        sideB: z.string().describe("פריט ב' המקביל לו")
      });
    }
    // 5. אמת או שקר
    if (type.includes('true') || type.includes('false')) {
      return z.object({
        statement: z.string().describe("ההיגד"),
        answer: z.boolean().describe("האם נכון או לא")
      });
    }
    // ברירת מחדל לכל שאר ה-25 (פאזל, גילוי תמונה וכו')
    return z.object({
      question: z.string().describe("השאלה/פריט"),
      answer: z.string().describe("התשובה/פתרון"),
      hint: z.string().optional().describe("רמז")
    });
  };

  try {
    const { object } = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: z.array(getSchema()),
      prompt: `צור תוכן למשחק ${gameType} בנושא ${topic} לילדים בגיל ${age}.
      צור בדיוק 10 פריטים. 
      חשוב: תוכן חינוכי, שפה פשוטה, מותאם לערכי הציבור החרדי/דתי.`,
    });

    return object;
  } catch (error) {
    console.error("AI Error:", error);
    // החזרת מבנה ריק כדי שהדף לא יקרוס
    return Array(5).fill({ question: "טעינה נכשלה", answer: "" });
  }
}