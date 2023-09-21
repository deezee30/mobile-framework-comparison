part of app_home;

class HomePage extends StatefulWidget {
  static const double kChartMinX = 0;
  static const double kChartMaxX = 100;
  static const double kChartMinY = 0;
  static const double kChartMaxY = 10;
  static const Duration kAnimationDuration = Duration(milliseconds: 300);

  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _simulateAsync = false;
  bool get simulateAsync => _simulateAsync;
  set simulateAsync(bool value) {
    setState(() {
      _simulateAsync = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    final HomeDataRepository generator = HomeDataRandomGeneratorService(
      size: 500,
      minX: HomePage.kChartMinX,
      maxX: HomePage.kChartMaxX,
      minY: HomePage.kChartMinY,
      maxY: HomePage.kChartMaxY,
      simulateAsync: _simulateAsync,
    );

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('App Flutter'),
          bottom: const TabBar(
            tabs: [
              Tab(child: Text('Tab 1')),
              Tab(child: Text('Tab 2')),
            ],
          ),
          actions: [
            Row(
              children: [
                const Text('Simulate Async'),
                Switch.adaptive(
                  value: simulateAsync,
                  onChanged: (value) => simulateAsync = value,
                ),
              ],
            )
          ],
        ),
        body: TabBarView(
          children: [
            _HomeTab1View(
              repository: generator,
            ),
            _HomeTab2View(
              repository: generator,
            ),
          ],
        ),
      ),
    );
  }
}

class _HomeTab1View extends StatelessWidget {
  const _HomeTab1View({
    super.key,
    required this.repository,
  });

  final HomeDataRepository repository;

  @override
  Widget build(BuildContext context) {
    return _HomeTabViewContainer(
      title: 'Tab View 1',
      repository: repository,
      builder: (context, data) => LineChart(
        getLineChartData(data),
        curve: Curves.linear,
        duration: HomePage.kAnimationDuration,
      ),
    );
  }

  LineChartData getLineChartData(List<(double, double)> data) {
    return LineChartData(
      lineBarsData: [
        LineChartBarData(
          spots: data.map((e) => FlSpot(e.$1, e.$2)).toList(),
          isCurved: true,
          curveSmoothness: 0.5,
          preventCurveOverShooting: true,
          barWidth: 1,
          color: Colors.green,
          dotData: FlDotData(
            getDotPainter: (spot, xPct, bar, idx) => FlDotCirclePainter(
              radius: 2,
              color: Colors.black,
              strokeWidth: 0.5,
              strokeColor: Colors.white,
            ),
          ),
        ),
      ],
      minX: HomePage.kChartMinX,
      maxX: HomePage.kChartMaxX,
      minY: HomePage.kChartMinY,
      maxY: HomePage.kChartMaxY,
      titlesData: const FlTitlesData(
        topTitles: AxisTitles(),
        rightTitles: AxisTitles(),
        leftTitles: AxisTitles(
          axisNameWidget: Text('y'),
          axisNameSize: 20,
          sideTitles: SideTitles(
            reservedSize: 25,
            showTitles: true,
            interval: (HomePage.kChartMaxY - HomePage.kChartMinY) / 10,
          ),
        ),
        bottomTitles: AxisTitles(
          axisNameWidget: Text('x'),
          axisNameSize: 20,
          sideTitles: SideTitles(
            reservedSize: 25,
            showTitles: true,
            interval: (HomePage.kChartMaxX - HomePage.kChartMinX) / 5,
          ),
        ),
      ),
    );
  }
}

class _HomeTab2View extends StatelessWidget {
  const _HomeTab2View({
    super.key,
    required this.repository,
  });

  final HomeDataRepository repository;

  @override
  Widget build(BuildContext context) {
    return _HomeTabViewContainer(
      title: 'Tab View 2',
      repository: repository,
      builder: (context, data) => LineChart(
        getLineChartData(data),
        curve: Curves.linear,
        duration: HomePage.kAnimationDuration,
      ),
    );
  }

  LineChartData getLineChartData(List<(double, double)> data) {
    return LineChartData(
      lineBarsData: [
        LineChartBarData(
          spots: data.map((e) => FlSpot(e.$1, e.$2)).toList(),
          isCurved: true,
          curveSmoothness: 0.5,
          preventCurveOverShooting: true,
          barWidth: 1,
          color: Colors.red,
          dotData: FlDotData(
            getDotPainter: (spot, xPct, bar, idx) => FlDotCirclePainter(
              radius: 2,
              color: Colors.black,
              strokeWidth: 0.5,
              strokeColor: Colors.white,
            ),
          ),
        ),
      ],
      minX: HomePage.kChartMinX,
      maxX: HomePage.kChartMaxX,
      minY: HomePage.kChartMinY,
      maxY: HomePage.kChartMaxY,
      titlesData: const FlTitlesData(
        topTitles: AxisTitles(),
        rightTitles: AxisTitles(),
        leftTitles: AxisTitles(
          axisNameWidget: Text('y'),
          axisNameSize: 20,
          sideTitles: SideTitles(
            reservedSize: 25,
            showTitles: true,
            interval: (HomePage.kChartMaxY - HomePage.kChartMinY) / 10,
          ),
        ),
        bottomTitles: AxisTitles(
          axisNameWidget: Text('x'),
          axisNameSize: 20,
          sideTitles: SideTitles(
            reservedSize: 25,
            showTitles: true,
            interval: (HomePage.kChartMaxX - HomePage.kChartMinX) / 5,
          ),
        ),
      ),
    );
  }
}

typedef ChartBuilder = Widget Function(
  BuildContext context,
  List<(double, double)> data,
);

class _HomeTabViewContainer extends StatelessWidget {
  const _HomeTabViewContainer({
    required this.title,
    required this.repository,
    required this.builder,
  });

  final String title;
  final HomeDataRepository repository;
  final ChartBuilder builder;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 40, horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 20),
          Flexible(
            child: FutureBuilder<List<(double, double)>>(
              future: repository.getData(),
              builder: (context, snapshot) {
                bool isLoading =
                    snapshot.connectionState != ConnectionState.done;
                return Stack(
                  children: [
                    AnimatedOpacity(
                      opacity: isLoading ? 0.5 : 1,
                      duration: HomePage.kAnimationDuration,
                      child: builder(context, snapshot.data ?? []),
                    ),
                    if (isLoading)
                      const Center(
                        child: CircularProgressIndicator.adaptive(),
                      )
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
