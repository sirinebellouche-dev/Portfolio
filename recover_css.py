import json

file_path = r'C:\Users\Administrateur\.gemini\antigravity\brain\d692c375-3e7d-4785-a595-37268bfa9128\.system_generated\logs\overview.txt'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    # Step index 24 is expected at index 9 or nearby
    for line in lines:
        try:
            data = json.loads(line)
            if data.get('step_index') == 24:
                tool_calls = data.get('tool_calls', [])
                for call in tool_calls:
                    if call.get('name') == 'write_to_file' and 'style.css' in call.get('args', {}).get('TargetFile', ''):
                        content = call['args']['CodeContent']
                        # The content is stringified JSON, so we might need to unescape it
                        # but usually it's just the string value.
                        # However, let's just print it.
                        print(content)
                        break
        except:
            continue
