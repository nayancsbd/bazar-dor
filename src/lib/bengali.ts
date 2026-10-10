const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const BENGALI_DIGIT_MAP: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

export function toBengaliNumber(value: number | string): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  return str.replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)] ?? digit);
}

export function parseBengaliNumber(value: string | number): number {
  if (typeof value === "number") return value;
  if (!value || typeof value !== "string") return 0;

  const normalized = value
    .replace(/[০-৯]/g, (ch) => BENGALI_DIGIT_MAP[ch] || ch)
    .replace(/[^0-9.-]/g, "");

  const parsed = parseFloat(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatPriceBn(price: number | string): string {
  const bn = toBengaliNumber(price);
  return `${bn} টাকা`;
}

export function formatUnitBn(unit: string): string {
  const normalized = unit.toLowerCase().trim();
  switch (normalized) {
    case "kg":
    case "কেজি":
      return "প্রতি কেজি";
    case "liter":
    case "লিটার":
      return "প্রতি লিটার";
    case "dozen":
    case "ডজন":
      return "প্রতি ডজন";
    case "piece":
    case "পিস":
      return "প্রতি পিস";
    case "gm":
    case "গ্রাম":
      return "প্রতি গ্রাম";
    default:
      return `প্রতি ${unit}`;
  }
}

export function formatPercentBn(pct: number): string {
  const abs = Math.abs(pct);
  const bn = toBengaliNumber(abs % 1 === 0 ? abs.toString() : abs.toFixed(1));
  return `${bn}%`;
}

const BENGALI_DAYS: Record<number, string> = {
  0: "রবিবার",
  1: "সোমবার",
  2: "মঙ্গলবার",
  3: "বুধবার",
  4: "বৃহস্পতিবার",
  5: "শুক্রবার",
  6: "শনিবার",
};

const BENGALI_MONTHS: Record<number, string> = {
  0: "জানুয়ারি",
  1: "ফেব্রুয়ারি",
  2: "মার্চ",
  3: "এপ্রিল",
  4: "মে",
  5: "জুন",
  6: "জুলাই",
  7: "আগস্ট",
  8: "সেপ্টেম্বর",
  9: "অক্টোবর",
  10: "নভেম্বর",
  11: "ডিসেম্বর",
};

export function getBengaliDate(inputDate?: Date): string {
  const date = inputDate || new Date();

  try {
    const formatter = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatter.format(date);
  } catch {
    const dayName = BENGALI_DAYS[date.getDay()] ?? "";
    const day = toBengaliNumber(date.getDate());
    const month = BENGALI_MONTHS[date.getMonth()] ?? "";
    const year = toBengaliNumber(date.getFullYear());
    return `${dayName}, ${day} ${month}, ${year}`;
  }
}
