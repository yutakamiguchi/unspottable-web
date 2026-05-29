// ドット絵キャラ（コードからテクスチャを生成。外部画像ファイル不要）。
// 全キャラ同一の見た目（群衆に紛れる仕様）。16x16 × 3フレーム。

const PALETTE: Record<string, string | null> = {
  ".": null,
  k: "#1e1a26",
  s: "#f0c6a0",
  h: "#503628",
  b: "#c84646",
  a: "#b43838",
  p: "#3c4670",
  o: "#282830",
  e: "#1e1a26",
};

const FRAMES: string[][] = [
  // 0: 立ち
  [
    "................",
    ".....kkkk.......",
    "....khhhhk......",
    "...khhhhhhk.....",
    "...ksssssssk....",
    "...kseseessk....",
    "...ksssssssk....",
    "...kksssskk.....",
    "..kkbbbbbbkk....",
    ".kabbbbbbbbak...",
    ".kabbbbbbbbak...",
    ".kabbbbbbbbak...",
    "..kbbbbbbbbk....",
    "...kppppppk.....",
    "...kpp..ppk.....",
    "...koo..ook.....",
  ],
  // 1: 左足前
  [
    "................",
    ".....kkkk.......",
    "....khhhhk......",
    "...khhhhhhk.....",
    "...ksssssssk....",
    "...kseseessk....",
    "...ksssssssk....",
    "...kksssskk.....",
    "..kkbbbbbbkk....",
    ".kabbbbbbbbak...",
    ".kabbbbbbbbak...",
    ".kabbbbbbbbak...",
    "..kbbbbbbbbk....",
    "..kppppppk......",
    "..kpp..ppk......",
    "..koo....ook....",
  ],
  // 2: 右足前
  [
    "................",
    ".....kkkk.......",
    "....khhhhk......",
    "...khhhhhhk.....",
    "...ksssssssk....",
    "...kseseessk....",
    "...ksssssssk....",
    "...kksssskk.....",
    "..kkbbbbbbkk....",
    ".kabbbbbbbbak...",
    ".kabbbbbbbbak...",
    ".kabbbbbbbbak...",
    "..kbbbbbbbbk....",
    "......kppppppk..",
    "......kpp..ppk..",
    "....koo....ook..",
  ],
];

export const CHAR_TEX = "char";
export const CHAR_SIZE = 16;
export const CHAR_FRAMES = FRAMES.length;

// Phaser のシーンに16x16×3フレームのスプライトシートを生成して登録する。
export function ensureCharTexture(scene: Phaser.Scene) {
  if (scene.textures.exists(CHAR_TEX)) return;
  const w = CHAR_SIZE * CHAR_FRAMES;
  const h = CHAR_SIZE;
  const tex = scene.textures.createCanvas(CHAR_TEX, w, h);
  if (!tex) return;
  const ctx = tex.getContext();
  FRAMES.forEach((fr, fi) => {
    for (let y = 0; y < CHAR_SIZE; y++) {
      for (let x = 0; x < CHAR_SIZE; x++) {
        const col = PALETTE[fr[y][x]];
        if (!col) continue;
        ctx.fillStyle = col;
        ctx.fillRect(fi * CHAR_SIZE + x, y, 1, 1);
      }
    }
  });
  tex.refresh();
  // フレーム分割
  for (let i = 0; i < CHAR_FRAMES; i++) {
    tex.add(i, 0, i * CHAR_SIZE, 0, CHAR_SIZE, CHAR_SIZE);
  }
}
