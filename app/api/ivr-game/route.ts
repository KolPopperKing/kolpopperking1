import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const digits = searchParams.get('ApiDigits');

  if (!digits) {
    return new NextResponse(`read=t-שלום לכם. אנא הקישו את קוד החדר המופיע על המסך ובסיום סולמית=digits,5,5,10,No,yes,no`, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new NextResponse(`id_list_message=t-הקשתם ${digits}. התשובה נקלטה במערכת קול פופר.`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}