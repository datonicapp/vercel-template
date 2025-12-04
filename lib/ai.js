import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set – AI features will not work");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const MODEL_NAME = "gemini-1.5-flash";

export async function analyzeEmailContent(emailText) {
  if (!genAI) {
    return {
      type: "unknown",
      extracted: {},
      missing: [],
      explanation: "No Gemini API key configured",
      shouldCreateListing: false,
      shouldCreateSearch: false
    };
  }

  const prompt = 
אתה סוכן נדל"ן חכם. קבל טקסט של מייל, ותחזיר JSON בלבד (חייב להיות JSON תקין) בפורמט הבא:

{
  "type": "sale" | "rent" | "search" | "ignore",
  "extracted": {
    "city": string | null,
    "address": string | null,
    "area": string | null,
    "rooms": number | null,
    "price": number | null,
    "floor": number | null,
    "sizeSqm": number | null,
    "hasElevator": boolean | null,
    "hasParking": boolean | null,
    "description": string | null,
    "contactPhone": string | null
  },
  "missing": [ ... list of field names that are important but missing ... ],
  "explanation": "הסבר קצר בעברית מה הבנת מהמייל",
  "shouldCreateListing": boolean,
  "shouldCreateSearch": boolean
}

type:
- "sale" = מודעת מכירה
- "rent" = מודעת השכרה
- "search" = בקשת חיפוש דירה
- "ignore" = לא קשור לנדל"ן או מייל אוטומטי

emailText:
"""${emailText}"""
;

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (e) {
    console.error("Failed to parse AI JSON:", e, text);
    return {
      type: "unknown",
      extracted: {},
      missing: [],
      explanation: "AI response was not valid JSON",
      shouldCreateListing: false,
      shouldCreateSearch: false
    };
  }
}
