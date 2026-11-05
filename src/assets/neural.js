// A stable seed keeps the same two hemispheres on each visit.
function randomGenerator(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

export function createNeuralScene(canvas) {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return null;

  const random = randomGenerator(31);
  const points = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 380; i++) {
      const z = random() * 2 - 1;
      const angle = random() * Math.PI * 2;
      const radius = Math.sqrt(1 - z * z);
      const fold = 1 + .095 * Math.sin(angle * 8 + z * 12) + .05 * Math.cos(z * 17);
      const depth = i < 90 ? .55 + random() * .44 : 1;
      points.push([
        side * .50 + .48 * radius * Math.cos(angle) * fold * depth,
        .66 * radius * Math.sin(angle) * fold * depth,
        .62 * z * fold * depth,
      ]);
    }
  }

  const connections = new Map();
  for (const [i, [x, y, z]] of points.entries()) {
    const closest = [];
    for (const [j, [a, b, c]] of points.entries()) {
      if (i === j) continue;
      const distance = (x - a) ** 2 + (y - b) ** 2 + (z - c) ** 2;
      if (closest.length === 4 && distance >= closest[3].distance) continue;
      closest.push({ j, distance });
      closest.sort((left, right) => left.distance - right.distance);
      if (closest.length > 4) closest.pop();
    }
    for (const { j } of closest) {
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      connections.set(a * points.length + b, [a, b]);
    }
  }

  const edges = [...connections.values()];
  const signals = Array.from({ length: 78 }, () => ({
    edge: edges[Math.floor(random() * edges.length)],
    offset: random(),
  }));
  const projected = points.map(() => [0, 0]);
  const sky = ctx.createRadialGradient(700, 270, 0, 700, 270, 340);
  sky.addColorStop(0, '#17220e');
  sky.addColorStop(1, '#080d0f');

  function draw(seconds) {
    const phase = seconds * Math.PI * 2 / 10;
    const yaw = -.4 + .16 * Math.sin(phase);
    const pitch = .12 + .08 * Math.cos(phase);
    const cosYaw = Math.cos(yaw);
    const sinYaw = Math.sin(yaw);
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);

    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const [i, [x, y, z]] of points.entries()) {
      const rotatedX = x * cosYaw + z * sinYaw;
      const depth = z * cosYaw - x * sinYaw;
      const scale = 210 / (1 + .19 * (y * sinPitch + depth * cosPitch));
      projected[i][0] = 686 + scale * rotatedX;
      projected[i][1] = 270 + scale * (y * cosPitch - depth * sinPitch);
    }

    ctx.strokeStyle = '#a4eb344a';
    ctx.lineWidth = .72;
    ctx.beginPath();
    for (const [a, b] of edges) {
      ctx.moveTo(...projected[a]);
      ctx.lineTo(...projected[b]);
    }
    ctx.stroke();

    ctx.fillStyle = '#c6f9759e';
    for (const [i, [x, y]] of projected.entries()) {
      const size = i % 6 ? 1.55 : 2.4;
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }

    for (const { edge: [a, b], offset } of signals) {
      const t = (seconds / 5 + offset) % 1;
      const [ax, ay] = projected[a];
      const [bx, by] = projected[b];
      const x = ax + (bx - ax) * t;
      const y = ay + (by - ay) * t;
      ctx.globalAlpha = Math.sin(Math.PI * t) ** 2;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
      glow.addColorStop(0, '#d8ff9e');
      glow.addColorStop(.25, '#b6f21a8c');
      glow.addColorStop(1, '#b6f21000');
      ctx.fillStyle = glow;
      ctx.fillRect(x - 8, y - 8, 16, 16);
    }
    ctx.globalAlpha = 1;
  }

  return { draw };
}
