interface Props {
    x: number;
    persistence: number;
    octaves: number;
}

// Credit: https://gamedev.stackexchange.com/questions/61940/sidescrolling-terrain-1d-perlin-noise
export class PerlinNoise1D {
    static compute({ x, persistence, octaves }: Props): number {
        var total = 0;
        const p = persistence;
        const n = octaves - 1;

        for (var i = 0; i <= n; i++) {
            const frequency = Math.pow(2, i);
            const amplitude = Math.pow(p, i);
            total += this.interpolatedNoise(x * frequency) * amplitude;
        }

        return total;
    }

    private static interpolatedNoise(x: number): number {
        const integerX = Math.floor(x);
        const fractionalX = x - integerX;

        const v1 = this.smoothNoise1D(integerX);
        const v2 = this.smoothNoise1D(integerX + 1);

        return this.cosineInterpolate(v1, v2, fractionalX);
    }

    private static cosineInterpolate(a: number, b: number, x: number): number {
        const ft = x * Math.PI;
        const f = (1 - Math.cos(ft)) * 0.5;

        return a * (1 - f) + b * f;
    }

    private static smoothNoise1D(x: number): number {
        return this.noise(x) / 2 + this.noise(x - 1) / 4 + this.noise(x + 1) / 4;
    }

    private static noise(x: number): number {
        x = (x << 13) ^ x;
        return (
            1.0 -
            ((x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) /
                1073741824.0
        );
    }
}
