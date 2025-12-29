
export type Language = 'en' | 'ru';

export interface FontStyle {
  name: string;
  weight: number;
  italic: boolean;
}

export interface Font {
  id: string;
  name: string;
  styleCount: number;
  family: string;
  category: 'Sans Serif' | 'Serif' | 'Display' | 'Monospace';
  description: string;
  tags: string[];
  price: number;
  designer: string;
  previewText: string;
  className: string; // Tailwind font class
  styles?: FontStyle[];
}

export interface TesterState {
  text: string;
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  alignment: 'left' | 'center' | 'right';
  isBold: boolean;
  isItalic: boolean;
}
