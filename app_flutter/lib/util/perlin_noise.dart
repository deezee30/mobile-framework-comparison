import 'dart:math';

// Credit: https://gamedev.stackexchange.com/questions/61940/sidescrolling-terrain-1d-perlin-noise
class PerlinNoise1D {
  static double compute(
    double x, {
    required double persistence,
    required int octaves,
  }) {
    double total = 0;
    double p = persistence;
    int n = octaves - 1;

    for (int i = 0; i <= n; i++) {
      num frequency = pow(2, i);
      num amplitude = pow(p, i);
      total += _interpolatedNoise(x * frequency) * amplitude;
    }

    return total;
  }

  static double _interpolatedNoise(double x) {
    int integerX = x.toInt();
    double fractionalX = x - integerX;

    double v1 = _smoothNoise1D(integerX);
    double v2 = _smoothNoise1D(integerX + 1);

    return _cosineInterpolate(v1, v2, fractionalX);
  }

  static double _cosineInterpolate(double a, double b, double x) {
    double ft = (x * pi);
    double f = ((1 - cos(ft)) * 0.5);

    return a * (1 - f) + b * f;
  }

  static double _smoothNoise1D(int x) {
    return _noise(x) / 2 + _noise(x - 1) / 4 + _noise(x + 1) / 4;
  }

  static double _noise(int x) {
    x = (x << 13) ^ x;
    return (1.0 -
        ((x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) /
            1073741824.0);
  }
}
