// ドット絵キャラ（コードからテクスチャを生成。外部画像ファイル不要）。
// 全キャラ同一の見た目（群衆に紛れる仕様）。32x32 × 3フレーム。
// 上半身は全フレーム共通。足だけ左右にゆれて歩行を表現（立ち / 左踏み / 右踏み）。

const PALETTE: Record<string, string | null> = {
  ".": null,
  k: "#1e1a26", // 輪郭・目・口
  s: "#f0c6a0", // 肌
  h: "#4a3328", // 髪
  b: "#c84646", // シャツ
  p: "#3c4670", // ズボン
  o: "#2a2a32", // 靴
};

// 頭〜腰まで（全フレーム共通の22行）
const UPPER: string[] = [
  "................................", // 0
  "................................", // 1
  ".........kkkkkkkkkkkkkk.........", // 2  髪トップ
  "........khhhhhhhhhhhhhhk........", // 3
  ".......khhhhhhhhhhhhhhhhk.......", // 4
  ".......khhhhhhhhhhhhhhhhk.......", // 5
  ".......khhsssssssssssshhk.......", // 6  前髪＋額
  ".......khsssssssssssssshk.......", // 7
  ".......khsskksssssskksshk.......", // 8  目
  ".......khsssssssssssssshk.......", // 9
  ".......kssssssssssssssssk.......", // 10
  ".......kssssssskksssssssk.......", // 11 口
  "........kssssssssssssssk........", // 12 あご
  "............kssssssk............", // 13 首
  ".....kbbbbbbbbbbbbbbbbbbbbk.....", // 14 肩
  ".....kbbbbbbbbbbbbbbbbbbbbk.....", // 15
  ".....kbbbbbbbbbbbbbbbbbbbbk.....", // 16
  ".....kbbbbbbbbbbbbbbbbbbbbk.....", // 17
  ".....kssbbbbbbbbbbbbbbbbssk.....", // 18 手
  ".....kssbbbbbbbbbbbbbbbbssk.....", // 19
  ".....kbbbbbbbbbbbbbbbbbbbbk.....", // 20 すそ
  "......kppppppppppppppppppk......", // 21 腰
];

// 足（22〜31行）。立ち：中央。左踏み：やや左へ。右踏み：やや右へ。
const LEGS_STAND: string[] = [
  ".......kppppppk..kppppppk.......", // 22
  ".......kppppppk..kppppppk.......", // 23
  ".......kppppppk..kppppppk.......", // 24
  ".......kppppppk..kppppppk.......", // 25
  ".......koooooook..koooooook.....", // 26 靴
  ".......koooooook..koooooook.....", // 27
  ".......koooooook..koooooook.....", // 28
  "................................", // 29
  "................................", // 30
  "................................", // 31
];

const LEGS_LEFT: string[] = [
  ".....kppppppk..kppppppk.........", // 22
  ".....kppppppk..kppppppk.........", // 23
  ".....kppppppk..kppppppk.........", // 24
  ".....kppppppk..kppppppk.........", // 25
  ".....koooooook..koooooook.......", // 26
  ".....koooooook..koooooook.......", // 27
  ".....koooooook..koooooook.......", // 28
  "................................", // 29
  "................................", // 30
  "................................", // 31
];

const LEGS_RIGHT: string[] = [
  ".........kppppppk..kppppppk.....", // 22
  ".........kppppppk..kppppppk.....", // 23
  ".........kppppppk..kppppppk.....", // 24
  ".........kppppppk..kppppppk.....", // 25
  ".........koooooook..koooooook...", // 26
  ".........koooooook..koooooook...", // 27
  ".........koooooook..koooooook...", // 28
  "................................", // 29
  "................................", // 30
  "................................", // 31
];

const FRAMES: string[][] = [
  [...UPPER, ...LEGS_STAND], // 0: 立ち
  [...UPPER, ...LEGS_LEFT],  // 1: 左踏み
  [...UPPER, ...LEGS_RIGHT], // 2: 右踏み
];

export const CHAR_TEX = "char";
export const CHAR_SIZE = 32;
export const CHAR_FRAMES = FRAMES.length;

// Phaser のシーンに32x32×3フレームのスプライトシートを生成して登録する。
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
