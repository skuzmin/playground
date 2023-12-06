import 'package:flutter/material.dart';

import 'widgets/dropdown.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color(0xff053122),
          title: const Text(
            'Playground',
            style: TextStyle(color: Colors.white),
          ),
          actions: const <Widget>[LanguageSelector()],
        ),
      ),
    );
  }
}
