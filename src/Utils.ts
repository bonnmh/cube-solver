const DIFF_THRESHOLD = 30;
const DOMINANT_THRESHOLD = 80;

export const CUBE = {
  f: [],
  b: [],
  l: [],
  r: [],
  u: [],
  d: []
};

export const FACES = {
  f: {},
  b: {},
  l: {},
  r: {},
  u: {},
  d: {}
};

export const DIRS = [
  {dx: 0, dy: -1},
  {dx: 1, dy: -1},
  {dx: 1, dy: 0},
  {dx: 1, dy: 1},
  {dx: 0, dy: 1},
  {dx: -1, dy: 1},
  {dx: -1, dy: 0},
  {dx: -1, dy: -1}
];

export const sameGroup = (a, b) => {
  return (
    Math.max(Math.abs(a.r - b.r), Math.abs(a.g - b.g), Math.abs(a.b - b.b)) <=
    DIFF_THRESHOLD
  );
};

export const loang = (arr: any[], group: number, i: number, j: number) => {
  if (arr[i][j].group === false) {
    arr[i][j].group = group;
    for (let dir of DIRS) {
      const tx = j + dir.dx;
      const ty = i + dir.dy;
      if (tx >= 0 && tx < arr[0].length && ty >= 0 && ty < arr.length) {
        if (sameGroup(arr[i][j], arr[ty][tx])) {
          loang(arr, group, ty, tx);
        }
      }
    }
  }
};

export const squareExist = (arr, x, y, cellWidth) => {
  const colors = {};
  for (let i = 0; i < cellWidth; i++) {
    for (let j = 0; j < cellWidth; j++) {
      const group = arr?.[y + i]?.[x + j]?.group;
      if (group) colors[group] = colors[group] + 1 || 1;
    }
  }
  let maxGroup = false;
  let maxValue = 0;
  for (let group in colors) {
    if (colors[group] > maxValue) {
      maxGroup = group;
      maxValue = colors[group];
    }
  }
  if ((maxValue * 100) / (cellWidth * cellWidth) < DOMINANT_THRESHOLD) {
    return false;
  }
  return arr[y + (cellWidth >> 1)][x + (cellWidth >> 1)];
};

export const extract = (arr: any[]) => {
  const height = arr.length;
  const width = arr[0].length;
  let founded = null;
  for (let cellWidth = Math.floor(width / 3); cellWidth > 2; cellWidth--) {
    const cubeWidth = cellWidth * 3;
    for (let x0 = 0; x0 < width - cubeWidth; x0++) {
      if (founded) break;
      for (let y0 = 0; y0 < height - cubeWidth; y0++) {
        if (founded) break;

        let validCube = true;
        const colors = [];
        for (let k = 0; k < 3; k++) {
          const row = [];
          for (let l = 0; l < 3; l++) {
            const tx = x0 + l * cubeWidth;
            const ty = y0 + k * cubeWidth;
            const square = squareExist(arr, tx, ty, cellWidth);
            if (!square) {
              validCube = false;
              break;
            } else {
              row.push(square);
            }
          }
          colors.push(row);
        }
        if (validCube) {
          founded = colors;
        }
      }
    }
  }
  return founded;
}; 