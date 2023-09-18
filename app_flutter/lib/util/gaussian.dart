import 'dart:math';

extension RandomGaussianX on Random {
  double nextGaussian({double mu = 0.5, double sigma = 1}) {
    double u1, u2, z;

    do {
      u1 = 2.0 * nextDouble() - 1.0; // Random number in [-1, 1]
      u2 = 2.0 * nextDouble() - 1.0; // Random number in [-1, 1]
      z = u1 * u1 + u2 * u2;
    } while (z >= 1.0 || z == 0.0);

    z = sqrt(-2.0 * log(z) / z);
    double result = mu + sigma * u1 * z;

    return min(1, max(0, result));
  }
}
