part of app_home;

abstract class HomeDataRepository {
  Future<List<(double, double)>> getData();
}

class HomeDataRandomGeneratorService implements HomeDataRepository {
  HomeDataRandomGeneratorService({
    required this.size,
    this.minX = 0.0,
    this.maxX = 1.0,
    this.minY = 0.0,
    this.maxY = 1.0,
    this.simulateAsync = false,
  });

  final int size;
  final double minX;
  final double maxX;
  final double minY;
  final double maxY;
  final bool simulateAsync;

  final math.Random rand = math.Random();

  @override
  Future<List<(double, double)>> getData() async {
    if (simulateAsync) await Future.delayed(const Duration(milliseconds: 500));
    int octaves = rand.nextInt(6) + 2;

    return List.generate(
      size,
      (index) {
        // Generate 1D terrain.
        double perlinNoise = PerlinNoise1D.compute(index / size,
            persistence: 0.9, octaves: octaves);
        // Add some gaussian noise.
        perlinNoise *= rand.nextGaussian(sigma: 0.2);
        // Move to baseline.
        perlinNoise += 0.5;
        double x = minX + (index / size) * (maxX - minX);
        double y = minY + perlinNoise * (maxY - minY);
        return (
          _clamp(x, minX, maxX),
          _clamp(y, minY, maxY),
        );
      },
    );
  }

  double _clamp(double d, double min, double max) {
    return (d.clamp(min, max) * 100).round() / 100;
  }
}
