interface GaussianProps {
    mu?: number;
    sigma?: number;
}

export const nextGaussian = ({
    mu = 0.5,
    sigma = 1.0,
}: GaussianProps): number => {
    var u1, u2, z;

    do {
        u1 = 2.0 * Math.random() - 1.0; // Random number in [-1, 1]
        u2 = 2.0 * Math.random() - 1.0; // Random number in [-1, 1]
        z = u1 * u1 + u2 * u2;
    } while (z >= 1.0 || z == 0.0);

    z = Math.sqrt((-2.0 * Math.log(z)) / z);
    const result = mu + sigma * u1 * z;

    return Math.min(1, Math.max(0, result));
};
