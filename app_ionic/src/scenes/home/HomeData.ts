import { nextGaussian } from "../../util/gaussian";
import { PerlinNoise1D } from "../../util/perlinNoise";

export interface HomeDataRepository {
    readonly minX: number;
    readonly maxX: number;
    readonly minY: number;
    readonly maxY: number;
    getData(): Promise<[number, number][]>;
}

interface HomeDataRandomGeneratorServiceProps {
    size: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    simulateAsync: boolean;
}

export class HomeDataRandomGeneratorService implements HomeDataRepository {
    private readonly size: number;
    readonly minX: number;
    readonly maxX: number;
    readonly minY: number;
    readonly maxY: number;
    private readonly simulateAsync: boolean;

    constructor({
        size,
        minX,
        maxX,
        minY,
        maxY,
        simulateAsync,
    }: HomeDataRandomGeneratorServiceProps) {
        this.size = size;
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
        this.simulateAsync = simulateAsync;
    }

    getData = async (): Promise<[number, number][]> => {
        if (this.simulateAsync) {
            await new Promise<void>((resolve) => setTimeout(resolve, 500));
        }
        const octaves: number = randomIntFromInterval(2, 8);

        return Array.from(Array(this.size), (_, index) => {
            // Generate 1D terrain.
            var perlinNoise = PerlinNoise1D.compute({
                x: index / this.size,
                persistence: 0.9,
                octaves: octaves,
            });
            // Add some gaussian noise.
            perlinNoise *= nextGaussian({sigma: 0.2});
            // Move to baseline.
            perlinNoise += 0.5;
            const x: number =
                this.minX + (index / this.size) * (this.maxX - this.minX);
            const y: number = this.minY + perlinNoise * (this.maxY - this.minY);
            return [
                clamp(x, this.minX, this.maxX),
                clamp(y, this.minY, this.maxY),
            ];
        });
    };
}

function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function clamp(d: number, min: number, max: number): number {
    return Math.round(Math.min(Math.max(d, min), max) * 100) / 100;
}
