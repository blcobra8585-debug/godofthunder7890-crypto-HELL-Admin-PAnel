export const FLUTTER_CODE_SNIPPET = `import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// ============================================================================
/// INTERNAL PROJECT REFERENCE: SS ENGINEERING (HELL PROTOCOL)
/// SENIOR ARCHITECT: SUHAN DEVIATION TEAM © 2026
/// DESIGN SPECIFICATION: OPTIMIZED FOR 1.5K AMOLED (Realme GT 6T DEVIATION)
/// TARGET SCREEN REPLICA RATE: 120Hz LTPO SMOOTHING
/// ============================================================================

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.black,
    statusBarIconBrightness: Brightness.light,
    systemNavigationBarColor: Colors.black,
    systemNavigationBarIconBrightness: Brightness.light,
  ));
  runApp(const HellProtocolApp());
}

class HellProtocolApp extends StatelessWidget {
  const HellProtocolApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HELL PROTOCOL',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF000000),
        primaryColor: const Color(0xFFFF0033),
        fontFamily: 'RobotoMono', // Monospace fallback
      ),
      home: const HellProtocolConsole(),
    );
  }
}

class HellProtocolConsole extends StatefulWidget {
  const HellProtocolConsole({Key? key}) : super(key: key);

  @override
  State<HellProtocolConsole> createState() => _HellProtocolConsoleState();
}

class _HellProtocolConsoleState extends State<HellProtocolConsole> with SingleTickerProviderStateMixin {
  // Waveform Animation Controller for MITM Audio Sniffer
  late AnimationController _waveformController;
  
  // State variables for Section 1: SCADA System
  final List<Map<String, dynamic>> _scadaControls = [
    {'name': 'Remote SS Crane Control', 'active': false, 'hex': '0xE791'},
    {'name': 'Magnetic Brake Disconnect', 'active': true, 'hex': '0xFA02'},
    {'name': 'Plant Grid Blackout', 'active': false, 'hex': '0xBB81'},
    {'name': 'Generator Fuel Bleed Simulation', 'active': false, 'hex': '0x0D0E'},
    {'name': 'Boiler Pressure Override', 'active': true, 'hex': '0xD991'},
    {'name': 'Transformer Trip Logic', 'active': false, 'hex': '0xC21B'},
    {'name': 'PLC Gate Inversion', 'active': false, 'hex': '0x88EF'},
    {'name': 'Conveyor Reverse Override', 'active': false, 'hex': '0x442D'},
    {'name': 'Siren Array Trigger', 'active': true, 'hex': '0x10AA'},
    {'name': 'Ventilation Shutoff', 'active': false, 'hex': '0xDF93'},
  ];

  // State variables for Section 2: Surveillance Telemetry
  final List<Map<String, dynamic>> _surveillanceItems = [
    {'name': 'CCTV Stream Intercept', 'status': 'INTERCEPTED', 'pushed': true},
    {'name': 'Biometric Feedback Spoofing', 'status': 'SPOOF_ACTIVE', 'pushed': true},
    {'name': 'Thermal Signature Tracker', 'status': 'CALIBRATING', 'pushed': false},
    {'name': 'Motion Sensor Inversion', 'status': 'INVERTED', 'pushed': true},
    {'name': 'Proximity Ping Flood', 'status': 'STANDBY', 'pushed': false},
    {'name': 'Flashlight Battery Load Simulator', 'status': 'LOAD_OPTIMAL', 'pushed': true},
  ];

  // State variables for Section 3: Cognitive AI Dialogue
  String _activeAiFramework = 'Gemini-1.5-Pro';
  String _dialogueLog = 'MITM_ROUTING: Standby for prompt injection interception...';
  double _pitchMultiplier = 1.0;
  bool _fallbackEnabled = true;

  // State variables for Section 4: Dynamic Threat Environment
  double _zombieAggression = 78.5;
  double _hapticBurstFreq = 4.0;
  bool _inventoryFreeze = true;
  String _currentWeatherVector = 'TOXIC_RAIN';
  bool _screenGlitchActive = false;

  // State variables for Section 5: Real-time Terminal Input & Scroll log
  final TextEditingController _terminalController = TextEditingController();
  final ScrollController _logScrollController = ScrollController();
  final List<String> _kernelLogs = [
    '[SYSTEM] BOOTED SG-01 MIDDLEWARE COILS SUCCESSFUL',
    '[NETWORK] PORT 3000 CONSOLE INGRESS READY',
    '[SECURE] biometric_cleared = suhanshaikh78957@gmail.com',
    '[DATABASE] SUPABASE STRAWBERRY FAILOVER POOL ONLINE',
    '[ZOMBIES] TELEMETRY DISPATCH THREAD INITIALIZED',
    '[HELL] SYS_MUTATION_ALIVE: ENABLING HELL... SUCCESS',
  ];

  // Simulated live hexadecimal stream for telemetry data
  Timer? _hexRotationTimer;

  @override
  void initState() {
    super.initState();
    _waveformController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat();

    // Start hex stream rotators to simulate changing SCADA exploit hex states
    _hexRotationTimer = Timer.periodic(const Duration(milliseconds: 900), (timer) {
      if (mounted) {
        setState(() {
          for (var ctrl in _scadaControls) {
            if (ctrl['active']) {
              final randomHex = math.Random().nextInt(65535).toRadixString(16).toUpperCase();
              ctrl['hex'] = '0x\${randomHex.padLeft(4, \'0\')}';
            }
          }
        });
      }
    });
  }

  @override
  void dispose() {
    _waveformController.dispose();
    _hexRotationTimer?.cancel();
    _terminalController.dispose();
    _logScrollController.dispose();
    super.dispose();
  }

  // Trigger simulated device haptic feedback burst
  void _triggerHapticBurst() {
    HapticFeedback.vibrate();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: const Color(0xFF000000),
        duration: const Duration(milliseconds: 500),
        border: const Border(top: BorderSide(color: Color(0xFFFF0033), width: 1.5)),
        content: Text(
          'HAPTIC BURST ENGINE DETECTED (Freq: \${_hapticBurstFreq.toStringAsFixed(1)}Hz)',
          style: const TextStyle(
            color: Color(0xFFFF0033),
            fontFamily: 'RobotoMono',
            fontSize: 10,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  // Execute typed console commands
  void _executeCommand(String rawCmd) {
    if (rawCmd.isEmpty) return;
    final cmd = rawCmd.toLowerCase().trim();
    _terminalController.clear();

    setState(() {
      _kernelLogs.add('>>> \$rawCmd');
      
      if (cmd == 'help') {
        _kernelLogs.add('[HELP] ALLOWED SCADA CODES: help, override all, purge cache, trigger radar');
      } else if (cmd == 'override all') {
        for (var ctrl in _scadaControls) {
          ctrl['active'] = true;
        }
        _kernelLogs.add('[OVERRIDE] FORCE BYPASS SECTORS GRANTED - ALL PLC ONL_STATE');
      } else if (cmd == 'purge cache') {
        _kernelLogs.add('[PURGE] MEMORY FLUSH COILS TERMINATED COMPLETELY');
      } else if (cmd == 'trigger radar') {
        _kernelLogs.add('[RADAR] SCAN SEQUENCE EMITTED FROM CLIENT IP: PORT 3000');
      } else {
        _kernelLogs.add('[COMMAND_ERROR] UNRECOGNIZED PENETRATION STRING: \$cmd');
      }
    });

    // Auto-scroll kernel log interface
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_logScrollController.hasClients) {
        _logScrollController.animateTo(
          _logScrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250),
          curve: Curves.fastOutSlowIn,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF000000),
        elevation: 0,
        centerTitle: true,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, py: 2),
              decoration: BoxDecoration(
                border: Border.all(color: const Color(0xFFFF0033), width: 0.8),
                borderRadius: BorderRadius.circular(3),
              ),
              child: const Text(
                'SS-ENG EXTREME',
                style: TextStyle(
                  color: Color(0xFFFF0033),
                  fontFamily: 'RobotoMono',
                  fontSize: 8,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              'HELL PROTOCOL V3',
              style: TextStyle(
                color: Colors.white,
                fontFamily: 'RobotoMono',
                fontSize: 12,
                fontWeight: FontWeight.w900,
                letterSpacing: 2.0,
              ),
            ),
          ],
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1.0),
          child: Container(
            color: const Color(0xFFFF0033).withOpacity(0.4),
            height: 1.0,
          ),
        ),
      ),
      body: SafeArea(
        child: Container(
          color: const Color(0xFF000000),
          child: ListView(
            padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 12.0),
            children: [
              // 1. SCADA OVERRIDE SIMULATOR
              _buildModernSection(
                title: '1. INDUSTRIAL SCADA & PLC OVERRIDE',
                color: const Color(0xFFFF0033),
                children: [
                  const Text(
                    'DANGER: DIRECT CONTROL SYSTEM INTERFACE FOR HIGH-PRESSURE CORE PIPING',
                    style: TextStyle(color: Colors.grey, fontSize: 8.5, fontFamily: 'RobotoMono'),
                  ),
                  const SizedBox(height: 10),
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _scadaControls.length,
                    separatorBuilder: (_, __) => Divider(color: const Color(0xFFFF0033).withOpacity(0.12), height: 8),
                    itemBuilder: (context, index) {
                      final item = _scadaControls[index];
                      return Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  item['name'],
                                  style: TextStyle(
                                    color: item['active'] ? Colors.white : Colors.grey[600],
                                    fontSize: 10.5,
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'RobotoMono',
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  'EXPLOIT STATUS: \${item['hex']} [STREAMING]',
                                  style: TextStyle(
                                    color: item['active'] ? const Color(0xFFFF0033).withOpacity(0.8) : Colors.grey[750],
                                    fontSize: 8,
                                    fontFamily: 'RobotoMono',
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Switch(
                            value: item['active'],
                            activeColor: const Color(0xFFFF0033),
                            activeTrackColor: const Color(0xFFFF0033).withOpacity(0.2),
                            inactiveThumbColor: Colors.grey[700],
                            inactiveTrackColor: Colors.black,
                            onChanged: (val) {
                              setState(() {
                                item['active'] = val;
                              });
                            },
                          ),
                        ],
                      );
                    },
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // 2. SURVEILLANCE & PACKET ANALYSIS INFILTRATION
              _buildModernSection(
                title: '2. SURVEILLANCE & PACKET INFILTRATION',
                color: const Color(0xFFFF0033),
                children: [
                  const Text(
                    'MITM COGNITIVE AUDIO SIGNAL SNIFFER (LIVE EXTRINSIC TELEMETRY CAPTURE)',
                    style: TextStyle(color: Colors.grey, fontSize: 8, fontFamily: 'RobotoMono'),
                  ),
                  const SizedBox(height: 12),
                  // Animated custom wave painting represents direct packet interception feed
                  Container(
                    height: 55,
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: Colors.black,
                      border: Border.all(color: const Color(0xFFFF0033).withOpacity(0.25), width: 1),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: ClipRect(
                      child: AnimatedBuilder(
                        animation: _waveformController,
                        builder: (context, child) {
                          return CustomPaint(
                            painter: SymmetricWaveformPainter(
                              animationValue: _waveformController.value,
                              waveColor: const Color(0xFFFF0033),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'SECURE SYSTEM SPOOF INFILTRATION LIST:',
                    style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold, fontFamily: 'RobotoMono'),
                  ),
                  const SizedBox(height: 6),
                  Wrap(
                    spacing: 6.0,
                    runSpacing: 6.0,
                    children: _surveillanceItems.map((item) {
                      return InkWell(
                        onTap: () {
                          setState(() {
                            item['pushed'] = !item['pushed'];
                            item['status'] = item['pushed'] ? 'FORCE_ON_SEC' : 'DISENGAGED';
                          });
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                          decoration: BoxDecoration(
                            color: item['pushed'] ? const Color(0xFFFF0033).withOpacity(0.12) : Colors.black,
                            border: Border.all(
                              color: item['pushed'] ? const Color(0xFFFF0033) : Colors.grey[850]!,
                              width: 0.8,
                            ),
                            borderRadius: BorderRadius.circular(3),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Container(
                                width: 4.5,
                                height: 4.5,
                                decoration: BoxDecoration(
                                  color: item['pushed'] ? const Color(0xFFFF0033) : Colors.transparent,
                                  shape: BoxShape.circle,
                                  border: Border.all(color: const Color(0xFFFF0033), width: 0.5),
                                ),
                              ),
                              const SizedBox(width: 6),
                              Text(
                                '\${item['name']}: \${item['status']}',
                                style: const TextStyle(
                                  fontSize: 8,
                                  color: Colors.white,
                                  fontFamily: 'RobotoMono',
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // 3. COGNITIVE AI DIALOGUE CORRUPTION PANEL
              _buildModernSection(
                title: '3. COGNITIVE AI DIALOGUE CORRUPTION',
                color: const Color(0xFFFF0033),
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'AI CORE DEVIATION FRAMEWORK:',
                        style: TextStyle(color: Colors.grey, fontSize: 8, fontFamily: 'RobotoMono'),
                      ),
                      DropdownButton<String>(
                        value: _activeAiFramework,
                        dropdownColor: Colors.black,
                        underline: const SizedBox(),
                        style: const TextStyle(color: Color(0xFFFF0033), fontSize: 9.5, fontFamily: 'RobotoMono', fontWeight: FontWeight.bold),
                        items: ['Gemini-1.5-Pro', 'Claude-3.5-Sonnet', 'Groq Llama-3-70B']
                            .map((fw) => DropdownMenuItem(value: fw, child: Text(fw)))
                            .toList(),
                        onChanged: (newFw) {
                          if (newFw != null) {
                            setState(() {
                              _activeAiFramework = newFw;
                              _dialogueLog = 'MITM_ROUTING_REALLOCATED: Target rerouters connected dynamically onto \${newFw.toUpperCase()}';
                            });
                          }
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.black,
                      border: Border.all(color: const Color(0xFFFF0033).withOpacity(0.18)),
                      borderRadius: BorderRadius.circular(3),
                    ),
                    child: Text(
                      _dialogueLog,
                      style: const TextStyle(color: Colors.grey, fontSize: 8.5, fontFamily: 'RobotoMono'),
                    ),
                  ),
                  const SizedBox(height: 10),
                  // Control panel rows for corruption metrics
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: Color(0xFFFF0033), width: 0.8),
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(3)),
                          ),
                          onPressed: () {
                            setState(() {
                              _dialogueLog = 'OVERFLOW_TRIGGERED: Intercept vector loaded! Prompt injection payload initialized [0xFF71]';
                            });
                          },
                          child: const Text('TOKEN OVERFLOW SIM', style: TextStyle(color: Color(0xFFFF0033), fontSize: 8.5)),
                        ),
                      ),
                      const SizedBox(width: 6),
                      Expanded(
                        child: OutlinedButton(
                          style: OutlinedButton.styleFrom(
                            side: BorderSide(color: Colors.grey[700]!, width: 0.8),
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(3)),
                          ),
                          onPressed: () {
                            setState(() {
                              _dialogueLog = 'COILS_PURGE: Dialogue buffer flushed successfully.';
                            });
                          },
                          child: const Text('MEMORY FLUSHER', style: TextStyle(color: Colors.white, fontSize: 8.5)),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('ELEVENLABS VOICE PITCH:', style: TextStyle(color: Colors.white, fontSize: 8.5)),
                      Text('\${_pitchMultiplier.toStringAsFixed(2)}x', style: const TextStyle(color: Color(0xFFFF0033), fontSize: 9.5)),
                    ],
                  ),
                  Slider(
                    value: _pitchMultiplier,
                    min: 0.4,
                    max: 2.2,
                    activeColor: const Color(0xFFFF0033),
                    inactiveColor: Colors.grey[850],
                    onChanged: (val) {
                      setState(() {
                        _pitchMultiplier = val;
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // 4. DYNAMIC THREAT ENVIRONMENT ENGINE
              _buildModernSection(
                title: '4. DYNAMIC THREAT ENVIRONMENT ENGINE',
                color: const Color(0xFFFF0033),
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('ZOMBIE AGGRESSION OVERRIDE RATE:', style: TextStyle(color: Colors.grey, fontSize: 8)),
                      Text('\${_zombieAggression.toStringAsFixed(1)}%', style: const TextStyle(color: Color(0xFFFF0033), fontSize: 10, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  Slider(
                    value: _zombieAggression,
                    min: 10.0,
                    max: 100.0,
                    activeColor: const Color(0xFFFF0033),
                    inactiveColor: Colors.grey[850],
                    onChanged: (val) {
                      setState(() {
                        _zombieAggression = val;
                      });
                    },
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('HAPTIC FEEDBACK FREQUENCY:', style: TextStyle(color: Colors.grey, fontSize: 8)),
                      Text('\${_hapticBurstFreq.toStringAsFixed(1)}Hz', style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: Slider(
                          value: _hapticBurstFreq,
                          min: 1.0,
                          max: 10.0,
                          activeColor: Colors.white,
                          inactiveColor: Colors.grey[850],
                          onChanged: (val) {
                            setState(() {
                              _hapticBurstFreq = val;
                            });
                          },
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.vibration, color: Color(0xFFFF0033), size: 18),
                        onPressed: _triggerHapticBurst,
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Interactive glitch trigger
                      InkWell(
                        onTap: () {
                          setState(() {
                            _screenGlitchActive = !_screenGlitchActive;
                          });
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
                          decoration: BoxDecoration(
                            border: Border.all(
                              color: _screenGlitchActive ? const Color(0xFFFF0033) : Colors.grey[850]!,
                            ),
                            color: _screenGlitchActive ? const Color(0xFFFF0033).withOpacity(0.1) : Colors.black,
                          ),
                          child: Text(
                            'SCREEN GLITCH: \${_screenGlitchActive ? "ACTIVE" : "OFF"}',
                            style: TextStyle(
                              color: _screenGlitchActive ? const Color(0xFFFF0033) : Colors.grey,
                              fontSize: 8.5,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                      // Inventory freeze switch
                      Row(
                        children: [
                          const Text('AMMO FREEZE:', style: TextStyle(color: Colors.grey, fontSize: 8.5)),
                          const SizedBox(width: 4),
                          Checkbox(
                            value: _inventoryFreeze,
                            activeColor: const Color(0xFFFF0033),
                            onChanged: (val) {
                              setState(() {
                                _inventoryFreeze = val ?? false;
                              });
                            },
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // 5. SYSTEM TERMINAL INTERFACE
              _buildModernSection(
                title: '5. SYSTEM TERMINAL INTERFACE',
                color: const Color(0xFFFF0033),
                children: [
                  Container(
                    height: 120,
                    width: double.infinity,
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.black,
                      border: Border.all(color: const Color(0xFFFF0033).withOpacity(0.35)),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: ListView.builder(
                      controller: _logScrollController,
                      itemCount: _kernelLogs.length,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 3.0),
                          child: Text(
                            _kernelLogs[index],
                            style: const TextStyle(
                              color: Color(0xFFFF0033),
                              fontFamily: 'RobotoMono',
                              fontSize: 9,
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: _terminalController,
                    onSubmitted: _executeCommand,
                    style: const TextStyle(color: Colors.white, fontFamily: 'RobotoMono', fontSize: 10),
                    decoration: InputDecoration(
                      hintText: 'TYPE SYS COMMAND HERE (E.G. help, override all)',
                      hintStyle: TextStyle(color: Colors.grey[700], fontSize: 9),
                      prefixText: 'HELL_ROOT\$ ',
                      prefixStyle: const TextStyle(color: Color(0xFFFF0033), fontSize: 10, fontWeight: FontWeight.bold),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                      filled: true,
                      fillColor: Colors.black,
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey[850]!, width: 0.8),
                      ),
                      focusedBorder: const OutlineInputBorder(
                        borderSide: BorderSide(color: Color(0xFFFF0033), width: 1.0),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Neon glowing layout builder for a uniform cybersecurity vibe
  Widget _buildModernSection({
    required String title,
    required Color color,
    required List<Widget> children,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF000000),
        border: Border.all(color: color, width: 1.2),
        borderRadius: BorderRadius.circular(5),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.12),
            spreadRadius: 1,
            blurRadius: 8,
            offset: const Offset(0, 0),
          ),
        ],
      ),
      child: ExpansionTile(
        title: Text(
          title,
          style: TextStyle(
            color: color,
            fontFamily: 'RobotoMono',
            fontSize: 10.5,
            fontWeight: FontWeight.w900,
            letterSpacing: 1.2,
          ),
        ),
        collapsedIconColor: color,
        iconColor: color,
        initiallyExpanded: true,
        childrenPadding: const EdgeInsets.only(left: 12.0, right: 12.0, bottom: 12.0),
        backgroundColor: Colors.transparent,
        collapsedBackgroundColor: Colors.transparent,
        children: children,
      ),
    );
  }
}

/// ============================================================================
/// CUSTOM PAINTER FOR SIMULATING MITM PACKET ACTIVE SNIFFER
/// DRAWING DAMPED SINE CONE GRAPHICS
/// ============================================================================
class SymmetricWaveformPainter extends CustomPainter {
  final double animationValue;
  final Color waveColor;

  SymmetricWaveformPainter({
    required this.animationValue,
    required this.waveColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = waveColor
      ..strokeWidth = 1.2
      ..style = PaintingStyle.stroke;

    final path = Path();
    final midY = size.height / 2;
    final width = size.width;

    // We draw multiple overlapping sine waves to represent complex voice data
    for (int wave = 0; wave < 3; wave++) {
      paint.color = waveColor.withOpacity(0.8 - (wave * 0.25));
      path.reset();

      final amplitudeMultiplier = 1.0 - (wave * 0.3);
      final freqMultiplier = 1.0 + (wave * 0.5);

      for (double x = 0; x <= width; x += 3) {
        // Damping envelope calculation: tapers the sine wave to zero at both extreme edges
        final normalizedX = x / width;
        final envelope = math.sin(normalizedX * math.pi); // Sine envelope peaks in the middle

        final cycle = animationValue * 2 * math.pi;
        final sineVal = math.sin((normalizedX * 4 * math.pi * freqMultiplier) - cycle);

        final y = midY + (sineVal * (size.height * 0.45) * envelope * amplitudeMultiplier);

        if (x == 0) {
          path.moveTo(x, y);
        } else {
          path.lineTo(x, y);
        }
      }
      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(covariant SymmetricWaveformPainter oldDelegate) {
    return oldDelegate.animationValue != animationValue;
  }
}
`;
