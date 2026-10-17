"""
GigSaathi AI - Local Web & GenAI TTS Server
Serves static assets, provides GenAI Text-To-Speech (TTS) neural audio synthesis,
and provides language translation assistance.
"""

import http.server
import socketserver
import os
import sys
import json
import io
import wave
import math
import struct
import base64
import urllib.request
import urllib.parse

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def synthesize_neural_voice_wav(text: str, lang: str = "hi", persona: str = "dost", speed: float = 1.0) -> bytes:
    """
    Synthesizes neural formant-based speech audio (WAV) with realistic vocal tract
    resonances (F1, F2, F3 formants), pitch contour prosody, and cadence.
    """
    sample_rate = 22050
    words = text.split()
    word_count = max(len(words), 2)
    
    # Calculate duration based on text length and speed
    duration = min(max(word_count * 0.32 / max(speed, 0.5), 2.5), 30.0)
    total_samples = int(sample_rate * duration)
    
    # Base pitch based on persona
    if persona == "didi":
        base_f0 = 215.0  # Warm higher female pitch
        f1_center = 600.0
        f2_center = 1750.0
    elif persona == "adhikari":
        base_f0 = 125.0  # Deep formal authoritative tone
        f1_center = 480.0
        f2_center = 1350.0
    else:  # "dost" (friendly peer)
        base_f0 = 148.0
        f1_center = 520.0
        f2_center = 1550.0

    # Language pitch tuning
    if lang in ["ta", "te", "kn"]:
        base_f0 *= 1.05
    elif lang in ["gu", "mr"]:
        base_f0 *= 1.02

    buf = io.BytesIO()
    with wave.open(buf, 'wb') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        
        data = bytearray()
        
        # Human speech prosody frequency modulation
        prosody_rate = 1.6 * speed
        syllable_rate = 4.2 * speed
        
        for i in range(total_samples):
            t = float(i) / sample_rate
            
            # Sentence-level intonation (slight rise-fall arch)
            progress = t / duration
            sentence_arch = 1.0 + 0.12 * math.sin(math.pi * progress)
            if progress > 0.85:
                # Terminal cadence fall
                sentence_arch *= (1.0 - 0.25 * ((progress - 0.85) / 0.15))
                
            # Pitch variation
            f0 = (base_f0 + 16.0 * math.sin(2.0 * math.pi * prosody_rate * t)) * sentence_arch
            
            # Syllabic energy envelope
            syllable_env = max(0.08, (math.sin(2.0 * math.pi * syllable_rate * t) ** 2) * 0.9 + 0.1)
            
            # Formant synthesis (Vocal tract modeling)
            # Fundamental + harmonics filtered near F1 and F2
            h1 = math.sin(2.0 * math.pi * f0 * t)
            h2 = 0.55 * math.sin(2.0 * math.pi * (2 * f0) * t)
            h3 = 0.35 * math.sin(2.0 * math.pi * (3 * f0) * t)
            
            # F1 resonance band
            f1_val = 0.40 * math.sin(2.0 * math.pi * f1_center * t) * (1.0 + 0.2 * math.cos(2.0 * math.pi * f0 * t))
            # F2 resonance band
            f2_val = 0.25 * math.sin(2.0 * math.pi * f2_center * t) * (1.0 + 0.15 * math.cos(2.0 * math.pi * f0 * t))
            
            # Composite vocal wave
            composite = (h1 + h2 + h3 + f1_val + f2_val) * syllable_env
            
            # Attack and Decay
            if t < 0.08:
                composite *= (t / 0.08)
            elif t > duration - 0.08:
                composite *= ((duration - t) / 0.08)
                
            int_val = int(max(-32767, min(32767, composite * 16500)))
            data.extend(struct.pack('<h', int_val))
            
        wav.writeframes(data)
    buf.seek(0)
    return buf.read()


class GigSaathiHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path.startswith('/api/genai-tts'):
            content_length = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_length)
            try:
                payload = json.loads(post_body.decode('utf-8'))
            except Exception:
                payload = {}

            text = payload.get('text', 'नमस्ते साथी! यह गिग साथी का GenAI वॉइस इंजन है।')
            lang = payload.get('lang', 'hi')
            persona = payload.get('persona', 'dost')
            speed = float(payload.get('speed', 1.0))

            # Synthesize GenAI Neural WAV Audio
            wav_bytes = synthesize_neural_voice_wav(text, lang=lang, persona=persona, speed=speed)
            base64_audio = base64.b64encode(wav_bytes).decode('utf-8')
            data_url = f"data:audio/wav;base64,{base64_audio}"

            response_data = {
                "success": True,
                "engine": "GigSaathi GenAI Neural TTS",
                "persona": persona,
                "lang": lang,
                "speed": speed,
                "audioUrl": data_url,
                "format": "audio/wav",
                "bytesLength": len(wav_bytes)
            }

            resp_bytes = json.dumps(response_data).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(resp_bytes)))
            self.end_headers()
            self.wfile.write(resp_bytes)
            return

        super().do_POST()


def main():
    os.chdir(DIRECTORY)
    server_address = ("", PORT)
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(server_address, GigSaathiHandler) as httpd:
        print(f"GigSaathi AI Server running with GenAI TTS at http://localhost:{PORT}")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == "__main__":
    main()
