export interface PackMeta {
  id: string;
  title: string;
  description: string;
  range: string;
}

export const packMetas: PackMeta[] = [
  {
    id: "pack1",
    title: "Pakke 1: 0–10",
    description: "Lær tallinja fra 0 til 10 med hopp på 1.",
    range: "0–10",
  },
  {
    id: "pack2",
    title: "Pakke 2: 0–20",
    description: "Utforsk tallinja fra 0 til 20 med hopp på 1 og 2.",
    range: "0–20",
  },
  {
    id: "pack3",
    title: "Pakke 3: 10–30",
    description: "Tallinjer som ikke starter på 0, hopp på 2 og 5.",
    range: "10–30",
  },
  {
    id: "pack4",
    title: "Pakke 4: Bygg selv",
    description: "Bygg dine egne tallinjer med start, slutt og hopp.",
    range: "Fritt",
  },
];
