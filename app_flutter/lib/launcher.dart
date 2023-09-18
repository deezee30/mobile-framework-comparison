import 'package:app_flutter/style/style.dart';
import 'package:flutter/material.dart';

import 'feature/home.dart';

class AppLauncher extends StatelessWidget {
  const AppLauncher({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'App Flutter',
      theme: AppStyle.getTheme(),
      debugShowCheckedModeBanner: false,
      home: const HomePage(),
    );
  }
}
