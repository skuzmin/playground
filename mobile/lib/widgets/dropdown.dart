import 'package:flutter/material.dart';

class LanguageSelector extends StatefulWidget {
  const LanguageSelector({super.key});

  @override
  State<LanguageSelector> createState() => _LanguageSelectorState();
}

const languages = [
  {'name': 'Nodejs', 'value': 'node'},
  {'name': 'GO', 'value': 'go'},
];

class _LanguageSelectorState extends State<LanguageSelector> {
  String dropdownValue = 'node';

  @override
  Widget build(BuildContext context) {
    return DropdownButtonHideUnderline(
        child: DropdownButton<String>(
            value: dropdownValue,
            padding: const EdgeInsets.fromLTRB(24.0, 12.0, 24.0, 12.0),
            focusColor: Colors.transparent,
            icon: const Visibility(
                visible: false, child: Icon(Icons.arrow_downward)),
            onChanged: (String? value) {
              setState(() {
                dropdownValue = value!;
              });
            },
            selectedItemBuilder: (BuildContext context) {
              return languages.map((Map<String, String> lang) {
                return SizedBox(
                    width: 120,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: <Widget>[
                        Text(
                          lang['name']!,
                          style: const TextStyle(color: Colors.white),
                        ),
                        const SizedBox(width: 12.0),
                        const Icon(Icons.menu, color: Colors.white),
                      ],
                    ));
              }).toList();
            },
            items: languages.map((Map<String, String> lang) {
              return DropdownMenuItem<String>(
                value: lang['value']!,
                child: Text(lang['name']!,
                    style: const TextStyle(color: Colors.black)),
              );
            }).toList()));
  }
}
