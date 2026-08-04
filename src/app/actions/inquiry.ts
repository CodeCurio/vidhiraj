'use server';

import { saveInquiry } from '@/lib/firestore';

type FormState = { success: boolean; error?: string };

export async function submitInquiry(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  try {
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim() || '';
    const company = (formData.get('company') as string)?.trim() || '';
    const country = (formData.get('country') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();
    const productId = (formData.get('productId') as string)?.trim() || '';
    const productInterest = (formData.get('productInterest') as string)?.trim() || '';
    const quantity = (formData.get('quantity') as string)?.trim() || '';

    if (!name || !email || !country || !message) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    await saveInquiry({
      name,
      email,
      phone,
      company,
      country,
      message,
      ...(productId && { productId }),
      ...(productInterest && { productInterest }),
      ...(quantity && { quantity }),
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again or contact us via WhatsApp.',
    };
  }
}
