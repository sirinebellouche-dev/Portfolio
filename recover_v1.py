import json

file_path = r'C:\Users\Administrateur\.gemini\antigravity\brain\d692c375-3e7d-4785-a595-37268bfa9128\.system_generated\logs\overview.txt'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    
    # We want the first versions of index.html and style.css
    # In the logs, these are likely the first 'write_to_file' calls for these paths.
    
    html_content = None
    css_content = None
    js_content = None
    
    for line in lines:
        try:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                if call.get('name') == 'write_to_file':
                    args = call.get('args', {})
                    target = args.get('TargetFile', '').lower()
                    content = args.get('CodeContent')
                    
                    if 'index.html' in target and html_content is None:
                        html_content = content
                    if 'style.css' in target and css_content is None:
                        css_content = content
                    if 'script.js' in target and js_content is None:
                        js_content = content
        except:
            continue
            
    print("---HTML_START---")
    print(html_content)
    print("---HTML_END---")
    print("---CSS_START---")
    print(css_content)
    print("---CSS_END---")
    print("---JS_START---")
    print(js_content)
    print("---JS_END---")
