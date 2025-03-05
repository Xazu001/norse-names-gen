const runesAndLetters = [
  { rune: "ᚨ", letters: ["A"] },
  { rune: "ᛒ", letters: ["B"] },
  { rune: "ᚲ", letters: ["C"] },
  { rune: "ᛞ", letters: ["D"] },
  { rune: "ᛖ", letters: ["E"] },
  { rune: "ᚠ", letters: ["F"] },
  { rune: "ᚷ", letters: ["G"] },
  { rune: "ᚺ", letters: ["H"] },
  { rune: "ᛁ", letters: ["I"] },
  { rune: "ᛃ", letters: ["J"] },
  { rune: "ᚲ", letters: ["K"] },
  { rune: "ᛚ", letters: ["L"] },
  { rune: "ᛗ", letters: ["M"] },
  { rune: "ᚾ", letters: ["N"] },
  { rune: "ᛟ", letters: ["O"] },
  { rune: "ᛈ", letters: ["P"] },
  { rune: "ᛩ", letters: ["Q"] },
  { rune: "ᚱ", letters: ["R"] },
  { rune: "ᛋ", letters: ["S"] },
  { rune: "ᛏ", letters: ["T"] },
  { rune: "ᚢ", letters: ["U"] },
  { rune: "ᚡ", letters: ["V"] },
  { rune: "ᚹ", letters: ["W"] },
  { rune: "ᛪ", letters: ["X"] },
  { rune: "ᛦ", letters: ["Y"] },
  { rune: "ᛎ", letters: ["Z"] },
];

export function translateForRunes(name: string): string {
  const upperName = name.toUpperCase();

  let translatedName = "";

  for (let i = 0; i < upperName.length; i++) {
    const letter = upperName[i];

    const rune = runesAndLetters.find((item) => item.letters.includes(letter));

    if (rune) {
      translatedName += rune.rune;
    } else {
      translatedName += letter;
    }
  }

  return translatedName;
}
